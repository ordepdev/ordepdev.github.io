---
layout: post
title: "My favorite papers"
date: 2021-08-17
meta_description: "You'll find a curated list of great computer science papers that I've enjoyed reading and re-reading over the past years."
---

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sometimes people ask me which computer science papers they should read and I can&#39;t really answer that question, but I can list the papers I&#39;ve enjoyed reading over the past years.</p>&mdash; Pedro Tavareλ (@ordepdev) <a href="https://twitter.com/ordepdev/status/1426499455218450435?ref_src=twsrc%5Etfw">August 14, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Following the tweet above, I've decided to do a _thread dump_ of my favorite computer science papers.

This is not a _you should read these papers_ kind of post, it's a curated list of great
computer science papers that I've enjoyed reading and re-reading over the past years.

(I think you should read them as well!)

### 📃 [The Design and Implementation of a Log-Structured File System](https://people.eecs.berkeley.edu/~brewer/cs262/LFS.pdf)

💡 You'll learn about a technique called a log-structured file system that
writes all modifications to disk sequentially, thereby speeding up both file
writing and crash recovery.

![The Design and Implementation of a Log-Structured File System](https://pbs.twimg.com/media/E8vxs24VIAUh-a4?format=png)


### 📃 [The Ubiquitous B-Tree](http://carlosproal.com/ir/papers/p121-comer.pdf)

💡 You'll learn about a disk-based index structure called B-Tree and its
different variations. The paper does quite a good job of explaining why
they have been so successful over the years.

![The Ubiquitous B-Tree](https://pbs.twimg.com/media/E8vxtaxVoAYjdme?format=png&name=large)

### 📃 [The Log-Structured Merge-Tree](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.44.2782&rep=rep1&type=pdf)

💡 You'll continue to learn about low-cost indexing for a file experiencing
a high rate of record inserts over an extended period. The paper also provides
a nice comparison of LSM-tree and B-tree I/O costs.

![](https://pbs.twimg.com/media/E8vxuCgVUAUFwoz?format=png&name=large)

### 📃 [Kafka: a Distributed Messaging System for Log Processing](http://notes.stephenholiday.com/Kafka.pdf)

💡 You'll learn about log processing, Kafka's architecture, and design principles
including producers, brokers, and consumers.

![](https://pbs.twimg.com/media/E8vxujhVcAAOQlD?format=png&name=large)

### 📃 [ZooKeeper: Wait-free coordination for Internet-scale systems](https://www.usenix.org/legacy/event/atc10/tech/full_papers/Hunt.pdf)

💡 You'll learn about the ZooKeeper wait-free coordination kernel and a lot of
distributed systems concepts that are nicely described in the paper.

![](https://pbs.twimg.com/media/E8vxvGIUYAQ_xu3?format=png&name=large)

### 📃 [A Certified Digital Signature](http://www.merkle.com/papers/Certified1979.pdf)

💡 You'll learn about one-way functions, the Lamport-Diffie one-time signature,
and a new "tree-signature" also known as Merkle tree.

![](https://pbs.twimg.com/media/E8vxvodVIAAYyLv?format=png&name=large)

### 📃 [Time, Clocks and the Ordering of Events in a Distributed System](https://www.microsoft.com/en-us/research/uploads/prod/2016/12/Time-Clocks-and-the-Ordering-of-Events-in-a-Distributed-System.pdf)

💡 Leslie Lamport's most cited paper. You'll learn about logical clocks,
real-time synchronization, and concepts such as "total ordering" and "happened-before".

![](https://pbs.twimg.com/media/E8vxwPuUcAESScD?format=png&name=large)

### 📃 [Harvest, Yield, and Scalable Tolerant Systems](https://github.com/papers-we-love/papers-we-love/blob/master/distributed_systems/harvest-yield-and-scalable-tolerant-systems.pdf)

💡 You'll learn about strategies for improving a system's overall availability
while tolerating some kind of graceful degradation.

![](https://pbs.twimg.com/media/E8vxw1CVgAQsZk0?format=png&name=large)

### 📃 [The Byzantine Generals Problem](http://www.andrew.cmu.edu/course/15-749/READINGS/required/resilience/lamport82.pdf)

💡 You'll learn about reliability in computer systems, whenever it has to cope
with the failure of one or more of its components.

![](https://pbs.twimg.com/media/E8vxxX0VUAM4MQu?format=png&name=large)

### 📃 [Linearizability: A Correctness Condition for Concurrent Objects](http://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf)

💡 You'll learn about a strong correctness condition for concurrent objects that
guarantees a strict time ordering of read and write operations in a multi-threaded environment.

![](https://pbs.twimg.com/media/E8vxyOlVEAUjqbu?format=png&name=large)

### 📃 [Conflict-free Replicated Data Types](https://arxiv.org/abs/1805.06358)

💡 You'll learn about a data structure that makes the eventual consistency of a
distributed object possible without coordination between replicas.

![](https://pbs.twimg.com/media/E8vxyw1UcAMlVpS?format=png&name=large)

### 📃 [Delta State Replicated Data Types](https://arxiv.org/abs/1603.01529)

💡 You'll learn about an optimization made to state-based CRDTs that ensure convergence
by disseminating only recently applied changes, instead of the entire (possibly large) state.

![](https://pbs.twimg.com/media/E8vxzQAUYAIdq6Q?format=jpg&name=large)

### 📃 [Making reliable distributed systems in the presence of software errors](https://erlang.org/download/armstrong_thesis_2003.pdf)

💡 You'll learn about Erlang, concurrent programming, message passing, fault-tolerance,
and the concept of "let it crash".

![](https://pbs.twimg.com/media/E8v5esPXIAcbCaW?format=jpg&name=large)

### Looking for more papers?

These are my favorites.

I might be missing a few papers, for sure.

You can still find a lot of curated papers for you to read at
[@papers_we_love](https://twitter.com/papers_we_love),
[@intensivedata](https://twitter.com/intensivedata),
and [@therealdatabass](https://twitter.com/therealdatabass).
