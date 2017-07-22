---
layout: post
title: "Boost your confidence with Consumer-Driven Contracts"
date:   2017-07-22
---

## Monoliths vs Microservices

In a monolithic application we don't need to worry about breaking contracts between different services because the compiler will do that job for us. If a given method signature changes, the contract between shared services is broken, and the build will automatically fail.

In a microservices approach, different services are deployed in different runtimes and don't know anything about each other. We don't have the compiler to detect those breaking changes and they became hard to detect and manage. Usually, they're found during end-to-end testing in a pre-production environment.

### Unit testing

When performing unit tests on services that depends on other external services, we tend to build our own stubs to assert the answers that we need in order to successfully run the test suite, not the answers that the producer service might deliver. By running unit tests against these predefined answers, it can lead to passing tests within the consumer service boundary and failing tests in a pre-production environment.

### End-to-end testing

These tests are designed to test the full application from top to bottom by simulating a real scenario. Despite being very useful in order to verify that a given scenario is working as expected across multiple applications, they tend to be very hard to write and maintain, slow to execute, and usually demanding of a dedicated pre-production environment. They also provide very late feedback, usually being the last tests being implemented.

## Common Contract Breaking Scenarios
* Renaming endpoints
* Adding new mandatory parameters
* Removing existing parameters
* Changing validations of existing parameters
* Changing the response types or status code

## Contracts Testing

> “An integration contract test is a test at the
boundary of an external service verifying that it 
meets the contract expected by a consuming service”
>
> &mdash; <cite>Martin Fowler</cite>

A contract is a set of expectations shared between a service that acts as a consumer and another service that acts like a producer. They focus the specification and delivery of service functionality around key business value drivers. The compatibility of a contract remains stable and immutable for a particular set of consumer contracts and expectations.

## Consumer-Driven Contracts Flow

![consumer-driven-contracts-flow](https://media.giphy.com/media/l0Iy8AwsJ6aINaPHa/giphy.gif "consumer-driven-contracts-flow")

## Spring Cloud Contract

> Provides support for Consumer Driven Contracts and service schemas in Spring applications, covering a range of options for writing tests, publishing them as assets, asserting that a contract is kept by producers and consumers, for HTTP and message-based interactions.
>
> &mdash; <cite>Spring Cloud Contract Team</cite>

### Defining the Contract

As a consumer we need to exactly define our expectations. In this case, when sending a request from the consumer to the producer, we want a successful response that matches with our request. Remember that the purpose of contract testing is not to start writing business features in the contracts. Stay focused and limit yourself to testing contracts between applications and avoid full behaviour simulation.

```javascript

Contract.make {
    request {
        method "POST"
        url "/validate"
        body ([
                size: "SMALL"
        ])
        headers {
            header("Content-Type", "application/json")
        }
    }
    response {
        status 200
        body([
                message: "Size is valid."
        ])
        headers {
            header("Content-Type", value(consumer("application/json"),
              producer(regex("application/json.*"))))
        }
    }
}
```

### Producer Test Generation

As a producer, the goal is to implement a feature that matches with the defined contract. In order to ensure that the application behaves in the same way as we defined above, an acceptance test is generated and it will run on every build, providing the feedback that we're chasing. The test calls the `/validate` endpoint with body `{"size":"SMALL"}` and run the assertions from the `request` section of our contract.

```java
@Test
public void validate_validSizeShouldReturnHttpOk() throws Exception {
  // given:
    MockMvcRequestSpecification request = given()
      .header("Content-Type", "application/json")
      .body("{\"size\":\"SMALL\"}");

  // when:
    ResponseOptions response = given().spec(request)
      .post("/validate");

  // then:
    assertThat(response.statusCode()).isEqualTo(200);
    assertThat(response.header("Content-Type")).matches("application/json.*");
  // and:
    DocumentContext parsedJson = JsonPath.parse(response.getBody().asString());
    assertThatJson(parsedJson).field("['message']").isEqualTo("Size is valid.");
}
```

If we change the endpoint from `/validate` to something like `/item/{uuid}/validate` or change the response code from `200` to `400`, the test will fail. These kind of testing prevents us from, silently, breaking changes on the consumer side.

### Stub Generation and Consumer Testing

As a consumer, the goal is to perform tests against the defined contract. In order to be able to perform those tests, a WireMock stub is also generated. The WireMock instance that is simulating the producer, will expose this stub every time that we trigger the `/validate` endpoint.

```javascript
{
  "id" : "4ae4d36d-3c8a-4f06-b9d2-215f73cc9f10",
  "request" : {
    "url" : "/validate",
    "method" : "POST",
    "headers" : {
      "Content-Type" : {
        "equalTo" : "application/json"
      }
    },
    "bodyPatterns" : [ {
      "matchesJsonPath" : "$[?(@.['size'] == 'SMALL')]"
    } ]
  },
  "response" : {
    "status" : 200,
    "body" : "{\"message\":\"Size is valid.\"}",
    "headers" : {
      "Content-Type" : "application/json"
    },
    "transformers" : [ "response-template" ]
  },
  "uuid" : "4ae4d36d-3c8a-4f06-b9d2-215f73cc9f10"
}
```

Our testing class should look like this:

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@AutoConfigureStubRunner(workOffline = true, ids = "me.ordepdev.contracts:+:stubs:8080")
public class ConsumerTest {

  @Test
  public void validate_withValidSize_shouldReturnHttpOk() throws Exception {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Type", "application/json");

    ResponseEntity<Response> response = restTemplate.exchange(
            "http://localhost:8080/validate", HttpMethod.POST,
            new HttpEntity<>("{\"size\":\"SMALL\"}", headers),
            Response.class
    );

    assertThat(response.getStatusCode()).isEqualByComparingTo(HttpStatus.OK);
    assertThat(response.getBody().toString()).isEqualTo("{\"message\":\"Size is valid.\"}");
  }
}
```

This test is responsible for making a request to our producer endpoint `http://localhost:8080/validate` and assert that the response is valid. Notice that we don't need to start up our producer service thanks to `@AutoConfigureStubRunner`. This annotation is responsible to start up a WireMock server at port `8080` with the stubs from the latest version of `me.ordepdev.contracts` package. If the contract is changed, our consumer side test that rely on it, will fail. That's the beauty of gluing these pieces together: all contract changes leads to failed builds during development.

## Why contract testing matters?




This approach gives you the ability to always test against a *synced* and *shared* contract between producer and consumer, instead of testing against *exclusively* consumer stubs, that ~~may~~ always differ from the producer ones. With a *failing fast* approach, you'll be always able to catch breaking changes during development phase.

#### Resources

[1] https://cloud.spring.io/spring-cloud-contract

[2] https://github.com/spring-cloud/spring-cloud-contract

[3] https://martinfowler.com/articles/consumerDrivenContracts.html
