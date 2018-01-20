---
layout: post
title: "Don't be fooled by 100% code coverage."
date: 2018-01-14
categories: [testing, quality, culture]
---

> A program with high test coverage, measured as a percentage, has had more of its
source code executed during testing which suggests it has a lower chance of containing
undetected software bugs compared to a program with low test coverage.

> "Let's make it clear, then: don't set goals for code coverage. You may think that
it could make your code base better, but asking developers to reach a certain code
coverage goal will only make your code worse."
>
> &mdash; <cite>Mark Seemann</cite>

## Why it's bad to use high code coverage as a goal?

In the snippet below we have a function `divide` that accepts two `float`
arguments, `x` and `y` and performs a division between them. Note that we don't
have any kind of guards on out code.

```java
float divide(float x, float y) {
  return x / y;
}
```

With the `divide` function we also provide a simple unit test that is making
sure that our function does the job. With this test, we have 100% code coverage.
It means that our code is bulletproof, right?

```java
@Test
public void divide_with_valid_arguments() {
  assertThat(new Calculator().divide(10, 2)).isEqualTo(5);
}
```

Nope. We have 100% coverage, that's a fact. But the code itself is not correct.
Also, we're testing one scenario; a positive and limited scenario. We should,
always, test for failure. In this particular case, what happens if we try to
divide by zero? We should check if the `y` is equal to zero and throw a proper
exception.

```java
float divide(float x, float y) {
  if (y == 0) {
    throw new ArithmeticException("Can't divide by zero.");
  }
  return x / y;
}
```

What's the problem with adding decision branches? Coverage drops and
there's no time to write another test. Having a good code coverage may be a sign
that we have a solid test suite, but if we're using it as a mandatory target,
the codebase will eventually suffer.

Humans always take shortcuts. When we have two possible choices, we always
choose the easier one. If the coverage value is part of the merging process,
developers will adapt the code to meet those requirements. A stronger, and
still meeting the 100% code coverage criteria, test suite, would like the
snippet below.

```java
@Test
public void divide_with_valid_arguments() {
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
and is intended to find failures in the system. If you're looking only to code
coverage as a quality criterion, the test below would do the job. 

```java
@Test
public void divide_with_valid_arguments() {
  assertThat(new Calculator().divide(10, 2)).isNotZero();
}
```

> "I don't know if they did code coverage analysis on this project, but of
course you can do this and have 100% code coverage - which is one reason
why you have to be careful on interpreting code coverage data."
>
> &mdash; <cite>Martin Fowler</cite>

## Amplifying the scenarios with parameterized tests

*Parameterized tests* are a *data-driven testing* technique that uses test inputs
and expected outcomes as data, normally in a tabular format, so that a single
driver script can execute all of the designed test cases. A suitable scenario
where *data-driven testing* can be applied is when two or more test cases requires
the same instructions but different inputs and different expected outcomes.

A nice technique to evaluate the different test inputs is to perform an
*equivalence class partitioning*, where we divide all possible inputs into
classes such that there is a finite number of input equivalence classes. Once,
they're set, we may assume that:
* the program behaves analogously for inputs in the same class;
* one test with a representative value from a class is sufficient;
* if the representative detects a defect, then other class members would detect the same defect.

For `x` and `y`, we can divide the inputs into four partitions: `{1, 20}`,
`{1.0, 20.0}`, `{-20, -1}`, and `{-20.0, -1.0}`. By combining
*equivalence class partitioning* and *parameterized tests* we can write
a single test with multiple scenarios like the snippet below.

```java
@ParameterizedTest
@CsvSource({
  "10, 5, 2",
  "-10, -5, 2",
  "10.5, 5.25, 2",
  "-5.0, -10.0, 0.5"
})
public void divide_with_valid_fields(float x, float y, float z) {
  assertThat(new Calculator().divide(x, y)).isEqualTo(z);
}
```

What is the coverage of this *parameterized test*? 100%. The same coverage
as the test below. A test that is not looking for failures in the system.

```java
@Test
public void divide_with_valid_arguments() {
  assertThat(new Calculator().divide(10, 2)).isNotZero();
}
```

Parameterized tests contribute to a much more solid test suite since we're
testing multiple scenarios with some edge cases, although it doesn't increase
code coverage.

## Summary

> "Designing your initial test suite to achieve 100% coverage is an even worse
idea. It's a sure way to create a test suite weak at finding those all-important
faults of omission."
>
> &mdash; <cite>Brian Marick</cite>

High code coverage is not directly related to code quality and can be used
neither as a key metric or a goal. Try to look for other metrics, expand the test
scenarios, and don't stop when you reach that shiny 100% mark.

---

More readings on the topic.
- [How to Misuse Code Coverage](http://www.exampler.com/testing-com/writings/coverage.pdf)
- [Code coverage is a useless target measure](http://blog.ploeh.dk/2015/11/16/code-coverage-is-a-useless-target-measure/)
- [Are there any formalized/mathematical theories of software testing?](https://softwareengineering.stackexchange.com/questions/216301/are-there-any-formalized-mathematical-theories-of-software-testing)
