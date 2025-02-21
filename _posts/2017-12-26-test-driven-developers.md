---
layout: post
title: "Test-Driven Developers: Building a testing culture."
date: 2017-12-26
categories: [ testing, culture ]
---

## First of all, why testing?

> Testing takes time, just like structural analysis takes time. Both activities
> ensure the quality of the end product. It’s time for software developers to take
> up the mantle of responsibility for what they produce. Testing alone isn’t
> sufficient, but it is necessary. Testing is the engineering rigor of software development. -- Neal Ford

Software engineering is much more than coding. It is "an engineering discipline
that is concerned with all aspects of software production". As professional
Software Engineers, we're responsible for the code we write. We should not
release untested code, and, what I think even more important, we should not ask
our peers to perform code reviews without delivering any test, that support the
produced code. It's our job to reduce the bugs that are found after the
development phase. No one is perfect, neither our code, but what matters most is
our software craftsmanship attitude of making sure that our code works properly.

## Types of Software Projects

Before jumping into testing culture and best practices, let's reflect on the
types of software projects that most of us end up working on during our career.

### 1. Projects without tests

How can we build projects without any kind of automated tests? Are we talking
about lack of professionalism, lack of skills or knowledge, or are we talking
about a work culture based on pressure where there is no time to test software?
It can be just one of them or can be all of them. It's a really hard question
to answer.

The point here is that we're talking about a team without testing culture, that
are able to deliver features without any kind of testing effort to support the
development phase, neither to assure a certain level of software quality.

### 2. Projects with wrongly designed tests

Testing is hard. There are several pitfalls in testing that often leads to false
positives, and in its turn leads to having a low number of developers running
the test suites. I will focus on two specific pitfalls: coupling and performance.

We tend to assume that exactly what an implementation does is precisely what we
want to test for. Our tests are often coupled to the implementation, where
sometimes the observed behaviour is incidental and have no bearing on the
desired functionality. When we need to change the implementation to match the
actual specification, may cause tests to fail. When we have correct
implementations and failing tests, we start to develop uncertainty and doubt
against our test suite.

Another pitfall in testing, that is caused by having a bad design, is when we
don't run the test suite because of the length of time they may take. If we are
working against a deadline, naturally, people will start cutting corners. And
by cutting corners, it means releasing without running the test suite. One
viable solution is to split the test suite into two or more profiles. I tend to
write both unit (fast) and integration (slow) tests. I want to run the unit
tests when I'm writing code, and if the feedback is immediate, I'll start to
develop a reliable relationship with my test suite.

We must treat testing code as we treat production code. If we have wrongly
designed test suites that are slow to run and provide false positives, we're
just wasting our time.

## Types of Testing

### 1. Testing after the implementation

I don't like this approach, but let's face it. It contributes to high code
coverage, project quality, and it can be used as living documentation, if well
designed. The problem with this approach is that we tend to design the test
cases to succeed since we're writing them after we implement the feature.
Also, most of the time, these tests, just test many things at a time and
they tend to get too big and complex and harder to maintain.

### 2. Tests that support development (TDD)

Actually, I don't know how to code without writing a test first. It makes us
reasoning about our design choices, it enforces us to change implementation
code only to make a test pass, it contributes to a high code coverage, and it
ensures that our code compiles all the time. We can write these types of tests
when we're implementing a brand new feature, or if we're refactoring some
existing code.

Refactoring doesn't change the current behaviour. So, if we're missing a test
that covers the piece of code that we're refactoring, writing one should be the
first thing to do. Once the test is green, we should start refactoring. After
we change the implementation and the test is failing, we're not refactoring.
We're rewriting the existing code to something different.

Test-Driven Development brings lots of advantages to the team and to the
project. Unfortunately, most people can't understand that.

### 3. Tests that reproduce reported bugs

This is one of my favorite testing techniques. Unfortunately, the common
scenario when a bug is reported is to open the IDE, pick some critical lines of
code and drop breakpoints after breakpoints. When all of them are set, we're
ready to debug.

After hours of debugging, the bug is fixed. Sometimes, the bug is fixed without
changing any line of code. In these situations what was the contribution to the codebase? None. No changes. No tests.

The optimal workflow is to write a test that can reproduce the reported bug.
We should start with a broader test scenario. Is the test green? Start
narrowing the scenario until the bug is found. With this approach, we make sure
that every change that we make to the source code is covered by a test that was failing. If we can't reproduce the bug,
at least at the end of the day, the
codebase is covered with more real-life scenarios.

## It's our job to build a testing culture. But how?

One of the rules for succeeding with a testing culture is to have everyone on
board on accepting that testing is part of our job. If someone can write new
features, it's their responsibility to write tests that cover those changes.
If we can't have everyone on board with this simple responsibility, I'll have
to admit that it will be almost impossible to change anyone's mind.

### 1. Every change must have tests

Changes that will end up in production must have been covered with tests.
It's as simple as that. We can't afford to have critical bugs in testing
or production environments being reported by Quality Assurance Analysts,
Product Owners, or even Customers. We just can't. It's an embarrassing and
costly situation.

### 2. Bug fixing must have tests

Sometimes we spend hours trying to reproduce reported bugs and we reach the
end of the day with nothing. Our search was inconclusive, and we close the
report without any single change to the codebase. The next month, the same
bug is reported, and another developer will spend another day searching for
a bug that can't be reproduced. If we write at least one test to cover the
reported scenario, we can make sure that our program, for that given scenario,
does not contain any bug at all.

### 3. Testing code must be reviewed

We should treat testing code as production code. Why? We like to show our
problem-solving and software design skills to our peers, right? So, why should
we write not-so-beautiful testing code? I will not extend to much on code
reviews (that's a topic for another article), but it is really important to be
a critic with the test's code quality. All of this while making sure that we're
asserting the critical points, and most of all, we need to contribute to a
blazing fast test suite. A well-designed test case/suite is much easier to
read, understand and evolve.

### 4. Test suites must be consistent.

If we want to build a solid testing culture on our team, we must share the same
values, the same practices, and the same tools. I'm not talking about code
formatting. That topic should be covered by a static analysis tool and style
checking policy shared across all team projects.

Every software engineer has its own habits of writing and designing code,
and also has their favorite tooling. Writing testing code is no exception.
Some people like too use fluent assertions, others not so much. The key point
here is to, as a team, reach a consensus and choose the appropriate tools for
the job and guarantee that everyone is on board happy to use them.

Regarding coding practices, we should use the same ones we use for production
code.

All of these choices must be consistent, and we can enforce them through
code reviews, and proper automated static analysis and style checking tools.

## So, what's the point?

I hope that, after reading this, you'll be able to enforce that everyone is
writing meaningful and valuable tests for every single change in your codebase.

Remember that testing itself takes time, and creating a testing culture is no
different. Testing alone isn’t sufficient, but it is necessary.

Be a software craftsman, evangelize your best practices!
