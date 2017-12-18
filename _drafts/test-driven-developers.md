---
layout: post
title: "Test-Driven Developers: Building a testing culture."
categories: [testing, culture]
---

First of all, why testing?

I like to say that software engineering is much more than coding. It is
"an engineering discipline that is concerned with all aspects of software
production". So, we can't describe ourselves as a Software Engineers by
just... coding.

Before jumping into testing culture and best practices, let's reflect on the
types of software projects that most of us end up working on during our career
and the types of testing that I found really useful.

# Types of Software Projects

1. Projects without tests.

A team without testing culture, that deliver completed features without any
kind of tests to support the development phase, neither to guarantee code 
quality. Although, in order to consider a feature completed someone has to 
test it manually. Let's suppose that our feature is a new endpoint on the 
brand new web API. The feature will be completed, if an HTTP request using 
Postman succeeds. Seems good enough, right?

2. Projects with wrongly designed tests.

Again, a team without testing culture. Although, they're testing but they're
doing it the wrong way. Eventually, the Product Owner asked if the product was
covered by tests, and after that, tweaked the definition of done of new features.
The tests, are slooooooooow. Too. Damn. Slow. Most of the times, developers don't
treat testing code with respect and they become a mix of spaghetti and lasagna; a mess. 
I can't decide if having wrongly designed test suites is actually better than
having no tests at all.

3. Projects with tests that nobody run!

A team with a testing culture of 50%. Some of them are TDD practitioners and they're
proud of their 90%+ code coverage. Their main job, aside from shipping greatness, is
to evangelize their testing culture. Unfortunately, it can be an exhaustive full-time job.
The tests are there, the coverage is there, they're fast, but... it takes time to run.

# Types of Testing

1. Tests that make sure that the feature is well implemented

I don't like this approach, but lets face it. It contributes to high code coverage,
project quality, and it can be used as living documentation, if well designed.
The problem with this approach is that we tend to design the test cases to succeed,
since we're writing them after we implement the feature. Also, most of the time,
these tests, just test to many things at a time and they tend to get too big and complex.

2. Tests that support development (TDD)

Actually, I don't know how to code without writing a test first. It makes us reasoning
about our design choices, it enforces us to change implementation code only to make a test
pass, it contributes to a high code coverage, and it make sure that our code compile all
the time. Test-Driven Development brings lots of advantages to the team and to the project.
Unfortunately, most of the people can't understand that.

3. Tests that reproduce reported bugs

This is one of my favorite testing techniques. Unfortunately, the common scenario when
a bug is reported is to open the IDE, pick some critical lines of code and drop breakpoints
after breakpoints. When all of them are set, we're ready to debug. After hours of debugging,
the bug is fixed. Sometimes, the bug is fixed without changing any line of code. In these
situations what was the contribution to the codebase? Zero. Zero changes. Zero tests.
The optimal workflow is to write a test that can reproduce the reported bug. We should start with a broader
test scenario. The test is green? Start narrowing the scenario until the bug is found. With this
approach, we make sure that every change that we make to the source code 
is covered by a test that was failing. If we can't reproduce the bug, at least at the end of the
day, the codebase is covered with more real life scenarios. 
