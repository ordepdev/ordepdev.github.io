# Boost your confidence with Consumer-Driven Contracts

## Monoliths vs Microservices

In a monolithic application we don't need to worry about breaking contracts between different services because the compiler will do that job for us. If a given method signature changes, the contract between shared services is broken, and the build will automatically fail.

In a microservices approach, different services are deployed in different runtimes and don't know anything about each other. We don't have the compiler to detect those breaking changes and they became hard to detect and manage. Usually, they're found during end-to-end testing in a pre-production environment.

### Unit testing

When performing unit tests on a service we tend to build our own mock stubs to assert the answers that we need, not the answers that the consumer/product services expect. By running unit tests against predefined answers, it can lead to a passing test within the service boundary and a failing test in a pre-production environment because those mocked stubs can be different from the reality. 

### End-to-end testing

These tests are designed to test the full application from top to bottom by simulating a real scenario. Despite being very useful in order to verify that a given scenario is working as expected across multiple applications, they tend to be very hard to write and maintain, slow to execute, and usually demanding of a dedicated pre-production environment. They also provide very late feedback, usually being the last tests being implemented.

## Common Contract Breaking Scenarios
* Renamed endpoint
* New mandatory parameter or field
* Removed existing parameter or field
* Changed validation of an existing parameter or field
* Changed response types or status code

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

As a consumer we need to exactly define our expectations. In this case, when sending an HTTP request from the consumer to the producer, we want a successful HTTP response that matches with our request. Remember that the purpose of contract testing is not to start writing business features in the contracts. Stay focused and limit yourself to test contracts between applications and not to simulate full behaviour.

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

### Test Generation

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

### Stub Generation

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
