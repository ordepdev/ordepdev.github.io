---
layout: post
title: "Don't be fooled by 100% code coverage."
categories: [testing, quality, culture]
---

> Let's make it clear, then: don't set goals for code coverage. You may think that
it could make your code base better, but asking developers to reach a certain code
coverage goal will only make your code worse.

## Why it's bad to use high code coverage as a goal?

I'll use a simple example to demonstrate how we try to achieve 100%
code coverage in our codebase. In the snippet below we have a function
`divide` that accepts two `int` arguments, `x` and `y` and performs a
division between them. Note that we don't have any kind of guards on out code.

```java
float divide(float x, float y) {
  return x / y;
}
```

With the `divide` function we also provide a simple unit test that is making
sure that our function does the job. With this test, we have 100% code coverage.
It means that our code is bullet proof, right? 

```java
@Test
public void divide_with_valid_arguments_success() {
  assertThat(new Calculator().divide(10, 2)).isEqualTo(5);
}
```

Nope. We have 100% coverage, that's a fact. But the code itself is not correct.
Also, we're testing one scenario, a positive and limited scenario. We should,
always, test for failure. In this particular case, we should check if the `y`
is equal to zero and throw a proper exception. What's the problem with adding
decision branches? Coverage drops and there's no time to write another test.
Having a good code coverage is good, but if we're using it as a mandatory target,
the codebase will eventually suffer.

```java
float divide(float x, float y) {
  if (y == 0) {
    throw new ArithmeticException("Can't divide by zero.");
  }
  return x / y;
}
```

Humans always take shortcuts. When we have two possible choices, we always
choose the easier one. If the coverage value is part of the merging process,
developers will adapt the code to meet those requirements. A stronger, and
still meeting the 100% code coverage criteria, test suite, would like the
snippet below.

```java
@Test
public void divide_with_valid_arguments_success() {
  assertThat(new Calculator().divide(10, 2)).isEqualTo(5);
}

@Test
public void divide_with_invalid_arguments_should_throw_exception() {
  assertThatThrownBy(() -> new Calculator().divide(10, 0))
      .isInstanceOf(ArithmeticException.class)
      .hasMessageContaining("Can't divide by zero.");
}
```

For a simple division function, we can successfully achieve 100% code coverage
with these two tests but, are we really done with the testing? Do our tests
cover a reasonable number of scenarios that make us feel confident about our
code? When testing, the hardest question is when to stop. For some, a shiny
100% code coverage is the answer to that question. It is important to look
for other quality factors than code coverage. Check if the test case is useful,
and is intended to find failures in the system. If your looking only to code
coverage as a quality criteria, the test bellow is doing the job.

```java
@Test
public void divide_with_valid_arguments_success() {
  assertThat(new Calculator().divide(10, 2)).isNotZero();
}
```

> I don't know if they did code coverage analysis on this project, but of
course you can do this and have 100% code coverage - which is one reason
why you have to be careful on interpreting code coverage data.

## Statement Coverage

--

## Branch Coverage

-- 

## Path Coverage

--

## Parameterized Unit Testing

> Parameterized tests contribute to a much more solid codebase, since we're
testing edge cases, although it doesn't increase code coverage.

-- example of a simple class implementation.
-- example of a unit test that covers 100% of the code without input range.
-- example of a unit test that covers 100% of the code with input range.

## Unit Testing + Mutation Testing

-- 100% code coverage means no bugs found in our code, right? Mutation testing says no.

## Summary

--

