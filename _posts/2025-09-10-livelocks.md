---
layout: post
title: "When more threads make things worse"
description: "Optimistic locking retries under contention can cause livelocks: threads appear to work, but their efforts repeatedly block each other."
date: 2025-09-10
---

I was catching up on the *Mutual Exclusion* chapter from [*The Art of Multiprocessor Programming*](https://eatonphil.com/2025-art-of-multiprocessor-programming.html), and while reading through the discussion thread, it became clear that there aren’t many practical, real-world examples of **livelocks** being shared.

This reminded me of a messy situation in production: a flawed implementation of **optimistic locking** combined with multiple threads consuming Kafka batches. It became a perfect recipe for threads actively preventing each other from making progress, while still appearing to **“do work.”**

At the time, it was clear that the retries were happening because of contention, but I didn’t know that this scenario could be classified as a **livelock**.

---

## Deadlock vs. Livelock

Most engineers are familiar with **deadlocks**: threads get stuck waiting on each other, and nothing moves forward. Easy to detect, easy to understand. A **livelock**, however, is sneakier. The book defines it like this:

> “Two or more threads actively prevent each other from making progress… When the system is livelocked rather than deadlocked, there is some way to schedule the threads so that the system can make progress (but also some way to schedule them so that there is no progress).”

The key insight is that a **livelock isn’t about threads being stuck waiting**, it’s about threads working so hard they keep undoing each other’s progress. Everything looks **busy and alive** on the outside. But inside, **things move very slowly**.

---

## The Perfect Storm: Kafka + Optimistic Locking

The system processed messages from Kafka in parallel. Multiple threads consumed batches of messages and updated database records with **optimistic locking**:

- Each record had a **version number**  
- When a thread tried to update a record, it checked the version at commit time  
- If the version had changed, the transaction would **abort and retry immediately**

This approach works fine under low contention. But a design change introduced a problem: new Kafka partitions were keyed differently from the database target table’s primary key.

Suddenly, multiple independent threads were consuming messages that **targeted the same database records**, causing a lot of contention and **triggering repeated retries**.

---

## The Retry Loop

A simplified example illustrates what happened:

1. Thread A reads Record X (version 1)
1. Thread B also reads Record X (version 1)
1. Thread A commits successfully, bumping Record X to version 2
1. Thread B tries to commit, sees the version mismatch, aborts, and immediately retries


Now multiply this by dozens of threads and many records. The system didn’t grind to a complete halt. Some transactions did succeed, but as the load increased, **throughput collapsed**. Adding more threads only made things worse.

Each thread was “working,” but most of that work was **wasted**. Threads were **canceling out each other’s progress**, exactly as described in the book:

> “There is some way to schedule the threads so that the system can make progress (but also some way to schedule them so that there is no progress).”

---

## Breaking the Livelock

The fix is counterintuitive: **slowing things down enables faster overall progress**. Two changes made the most significant difference:

1. **Back-off with Jitter**: Instead of retrying immediately, failed transactions waited for a randomized, exponential delay before retrying, giving “winning” threads time to finish cleanly before others piled back in.

2. **Align Partitioning with the Database**: Kafka consumption was reworked so that all messages related to the same database record were processed by the same thread, eliminating direct contention.

By deliberately **reducing concurrency** in these hotspots, the endless collision loop **stopped**.

---

## Community Perspective

When I shared this example online, someone replied with a perspective that perfectly sums up the broader lesson:

> “It’s a valid example. Generally, you have to degrade concurrency to escape the trap. For example, there’s an old concept called an ‘escalating lock manager’ that tries to prevent this. A different approach I’ve used more recently is to always include both a priority indicator and a retry count on each transaction. These hints allow the transaction manager to automatically degrade concurrency when it detects this scenario—for example, delaying other commits in the presence of a serial offender.”

This emphasizes the point: whether implementing back-off, introducing priority hints, or using more advanced transaction management techniques, the key to escaping a livelock is **controlled degradation of concurrency**. If every thread continues to fight at full speed, the system remains trapped in a **cycle of unproductive work**.

---

## Final Thoughts

Before reading *The Art of Multiprocessor Programming* and engaging online, it wouldn’t have been clear to call this a **livelock**. The retry loop wasn’t infinite, and progress was happening, just very slowly.

Now it’s clear: a livelock isn’t about frozen threads. It’s about a system stuck in a **cycle of unproductive work**, where the only way forward is to **slow down and coordinate**, rather than throwing more concurrency at the problem.
