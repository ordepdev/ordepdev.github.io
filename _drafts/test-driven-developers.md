---
layout: post
title: "Test-Driven Developers: Building a testing culture."
categories: [testing, culture]
---

## First of all, why testing?

I like to say that software engineering is much more than coding. It is
"an engineering discipline that is concerned with all aspects of software
production". So, we can't describe ourselves as a Software Engineers by
just... coding.

Before jumping into testing culture and best practices, let's reflect on the
types of software projects that most of us end up working on during our career
and the types of testing that I found really useful for each one.

## Types of Software Projects

### 1. Projects without tests.

A team without testing culture, that deliver completed features without any
kind of tests to support the development phase, neither to guarantee code 
quality. So, in the end, in order to consider a feature completed someone has to 
test it manually. Let's suppose that our feature is a new endpoint on the 
brand new web API. The feature will be completed, if an HTTP request using 
Postman succeeds. Seems good enough, right?

### 2. Projects with wrongly designed tests.

Again, a team without proper testing culture. They're testing but they're
doing it the wrong way. Eventually, the Product Owner asked if the product was
covered by tests, and after that, tweaked the definition of done of new features.
The tests, are slooooooooow. Too. Damn. Slow. Most of the times, developers don't
treat testing code with the respect it deserves and it become a mix of spaghetti and lasagna; a total mess. 
I can't decide if having wrongly designed test suites is actually better than
having no tests at all.

### 3. Projects with tests that nobody runs!

A team with a testing culture of 50%. Some of them are TDD practitioners and they're
proud of their 90%+ code coverage. Their main job, aside from shipping greatness, is
to evangelize their testing culture. Unfortunately, it can be an exhaustive full-time job.
The tests are there, the coverage is there, they're fast, but... it takes time to run.

## Types of Testing

### 1. Tests that make sure that the feature is well implemented

I don't like this approach, but lets face it. It contributes to high code coverage,
project quality, and it can be used as living documentation, if well designed.
The problem with this approach is that we tend to design the test cases to succeed,
since we're writing them after we implement the feature. Also, most of the time,
these tests, just test to many things at a time and they tend to get too big and complex and harder to maintain.

### 2. Tests that support development (TDD)

Actually, I don't know how to code without writing a test first. It makes us reasoning
about our design choices, it enforces us to change implementation code only to make a test
pass, it contributes to a high code coverage, and it ensures that our code compiles all
the time. We can write these types of tests when we're implementing a brand new feature,
or if we're refactoring some existing code.

Refactoring doesn't change the current behaviour. So, if we're missing a test that
covers the piece of code that we're refactoring, writing one should be the first thing
to do. Once the test is green, we should start refactoring. After we change the
implementation and the test is failing, we're not refactoring. We're rewriting the
existing code to something different.

Test-Driven Development brings lots of advantages to the team and to the project.
Unfortunately, most people can't understand that.

### 3. Tests that reproduce reported bugs

This is one of my favorite testing techniques. Unfortunately, the common scenario when
a bug is reported is to open the IDE, pick some critical lines of code and drop breakpoints
after breakpoints. When all of them are set, we're ready to debug.

After hours of debugging, the bug is fixed. Sometimes, the bug is fixed without
changing any line of code. In these situations what was the contribution to the codebase?
Zero. Zero changes. Zero tests.

The optimal workflow is to write a test that can reproduce the reported bug.
We should start with a broader test scenario. The test is green? Start narrowing
the scenario until the bug is found. With this approach, we make sure that every change
that we make to the source code is covered by a test that was failing. If we can't
reproduce the bug, at least at the end of the day, the codebase is covered with more
real life scenarios.

## It's our job to build a testing culture. But how?

One of the rules for succeeding with a testing culture is to have everyone on board
on accepting that testing is part of our job. If someone can write new features, it's
their responsibility to write tests that cover those changes. If we can't have everyone
on board with this simple responsibility, I'll have to admit that it will be almost impossible
to change anyone's mind.

### 1. Every change must have tests.

Changes that will end up into production must have been covered with tests.
It's as simple as that. We can't afford to have critical bugs on testing
or production environments beeing reported by Quality Assurance Analists,
Product Owners, or even Customers. We just can't. It's an embarassing and
costly situation.

### 2. Bug fixing must have tests.

Sometimes we spend hours trying to reproduce reported bugs and we reach the
end of the day with nothing. Our search was inconclusive, and we close the
report without any single change to the codebase. The next month, the same
bug is reported, and another developer will spend another day searching for
a bug that can't be reproduced. If we write at least one test to cover the
reported scenario, we can make sure that our program, for that given scenario,
does not contain any bug at all.

### 3. Testing code must be reviewed.

We should treat testing code as production code. Why? We like to show our
problem-solving and software design skills to our peers, right? So, why should
we write not-so-beautiful testing code? I will not extend to much on code reviews
(that's a topic for another article), but it is really important to be critic with
the test's code quality. All of this while making sure that we're asserting the critical points, and most
of all, we need to contribute to a blazing fast test suite. A well designed test
case/suite is much more easier to read, understand and evolve.

### 4. Test suites must be consistent.

--

## So, what's the point?

I hope that, after reading another post on software testing, you're writing
meaningful and valuable tests for every single change in your codebase.
Be a software craftsman, and evangelize your best practices!
