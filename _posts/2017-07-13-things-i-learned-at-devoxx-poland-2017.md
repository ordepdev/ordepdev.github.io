---
layout: post
title:  "Things I learned at Devoxx Poland 2017"
date:   2017-07-13
---

On 20-24 June I attended Devoxx Poland in Krakow. It was my first time on a big conference and it was totally worth it.

It is the biggest Java conference in Poland, during three days, with 2500 developers from 20 countries and 144 speakers.

It took place from in the ICE Conference Center, which is located directly by the Vistula river, with beautiful view over the Wawel Royal Castle.

![devoxx-view](https://goo.gl/4pHKQE "devoxx-view")

# My favorite talks

* Speed without Discipline: a Recipe for Disaster *by Venkat Subramaniam*

* Consumer Driven Contracts and Your Microservice Architecture *by Marcin Grzejszczak and Josh Long*

* Rethinking Microservices with Stateful Streams *by Ben Stopford*

* Streams in JDK 8: The Good, The Bad and The Ugly *by Simon Ritter*

* Pragmatist’s Guide to Functional Geekery *by Michał Płachta*

* Event Sourcing and CQRS with Spring Stream *by Jakub Pilimon*

* 360° Monitoring of Your Microservices *by Philipp Krenn*

* Migrating to Microservice Databases: From Relational Monolith to Distributed Data *by Edson Yanaga*


# Things I learned 

* JDD: Jesus Driven Development - "Please lord, let my code compile."

* Consumer-Driven Contracts with Spring Cloud Contracts

* Spring Rest Docs: generate documentation based on contract testing

* Don't delete columns; just stop using them!

* Encapsulate every database on a new microservice and never share databases between microservices.

* Blue-Green Deployments are a nightmare with shared databases.

* Real-time snapshots are better than traditional databases; at some point of time, our entities may have invalid state; with an event log, we have all entity mutations saved.

* Since an event log is immutable, a mutation mistake will be persisted forever; it will be necessary to create events to rollback those mistakes.

* Kafka Streams: Data Storage + Query Engine = *Shared Database* with immutable state.

* Maven is good, Gradle is 100x faster.

* Software projects must be polyglot. We must use always the right tool for the job.

* Jmeter does not scale; use Gatling instead.

* Always prefer Method References over Lambdas; they are faster because there is no need to create a virtual method to encapsulate the lambda expression.

* Mixing Internal & External Iteration: Don't. Use streams for the whole iteration.

* Parallel Streams: Not guaranteed to be faster, but will definitely do more work.

* Start monitoring thread pools. Measure server configurations. Don't rely on magic numbers!

* Logging, monitoring and tracing all the things!

* We develop json-to-json mapper waiting services on out day-to-day basis :)

# Things I didn't enjoy

DECIDE WHICH TALK TO GO NEXT!

# Conclusion

This whole experience was awesome. The organization, venue, and speakers were amazing and Devoxx is already my favorite conference. Really looking forward to comeback to Poland next year!
