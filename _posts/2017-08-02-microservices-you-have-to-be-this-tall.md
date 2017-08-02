---
layout: post
title: "Microservices? You have to be this tall!"
date:   2017-08-02
---

## Standardized Development Cycle

> local changes > testing > code review > build system > deployment

The majority of micro services failures are caused by bugs introduced during the development phase.
In order to reduce these bugs, we need to establish a proper development cycle that begins when the developer commits a change:

* unit tests should be run;
* the code review must be performed by two or more developers;
* the build system should run the integration tests and ensure that everything is ok;
* if the build is green, the change can be merged and deployed to a staging environment.

---

## Stable and Reliable Deployment Pipeline

> staging, canary and production rollouts

We don’t want bad deployments. There’s no reason to still ear the famous sentence: “works on my machine”.

The most reliable deployments are those that pass several steps before reaching the production servers. That's why we should deploy on several environments in order to ensure that our changes don't break anything.

We should keep in mind that deploying changes to a microservice multiple times per day will compromise the stability and reliability of our microservice.

---

## Monitoring

> if you can't measure, you don't know it works

Monitoring is one of the key principles of availability.

If the key metrics of our microservice aren’t tracked, we can’t predict any kind of failure until the failure itself occurs.

We should capture the metrics emitted by our microservice, log them, graph them and alert them on special situations. 

---

## Distributed Logging and Tracing

> SSH in Prod? You’re doing it wrong.

A production-ready microservice must trace every request through the entire stack. If we ensure that, afterwards we can retrieve important information about the system.

The log itself must be as rich as possible in order to determine what went wrong and where things fell apart. But we need to remember that logging is expensive. Make sure you don’t deploy debug logs into production!

Logging also needs to be available, scalable, easily accessible and searchable. Please, no more SSH in Prod.

---

## Dashboards

> if it moves, draw it

Every microservice must have at least one dashboard where all the key metrics are collected and displayed.

Anyone should be able to look at it and know immediately whether or not the micro service is working correctly.

Although, we should never be watching the dashboard in order to detect any kind of incident. That will be a sign that our alerting system is wrongly designed.

---

## Invert the Inverted Pyramid

> more unit and contract tests, less end-to-end tests

Unit tests and contract tests should be at the bottom of the pyramid. They are smaller, more focused, and they run very quickly.

E2E tests take more time to setup and run. That’s why they should be on top of the pyramid!

An heavy test suite will be more difficult to maintain, slow to run, and will not pinpoint the reported errors. We will end up debugging our own tests.

---

## Faster Feedback

> faster tests lead to faster feedback

In order for CI and CD to be practical, the full test suite should run every time a developer commits a change and the developer should have the feedback in a matter of minutes.

If we have a slow test suite, the team will probably skip this procedure and run the test suite from time to time instead of running when a developer commits a change.

If running tests on every commit is too slow, the solution is not to run the tests less often but instead to fix the situation so the test suite runs more quickly. The most obvious solutions is to ensure that our microservice is properly covered by unit tests, that are way faster than the others, and reduce the amount of slower tests.

---

## No More Silos

> between development and operations

Silos come from a lack of communication and collaboration between teams, not simply from a separation of duties.

Currently, the developers work ends to soon and the operations work starts too soon. We should give more end-to-end responsibilities to developers.

Instead of “works on dev, now it’s ops problem” we should move to “you build it, you run it!”

---

## Self-Sufficient Software Engineers

> fewer rockstars, more orchestras

The developers need to be responsible for not just writing code but also for managing the entire life-cycle of applications, ensuring its health, maintainability and observability.

This includes being responsible for deployments, rollbacks, monitoring and debugging, in addition to bug fixes and new feature development.

---

## Embrace Change

![microservices-buzzword](http://i.imgur.com/wcMTioE.png "microservices-buzzword")
