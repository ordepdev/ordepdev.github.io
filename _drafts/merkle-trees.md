---
layout: post
title: "Diving into Merkle Trees"
date: 2018-11-03
categories: [papers, computer-science, data-structures]
---

Introduced in 1998 by Ralph C. Merkle, the merkle tree, also known
as a binary hash tree, is a data structure used for efficiently
_summarizing and verifying the integrity of large sets of data_.
Initialy, they were used for the purpose of one-time signatures
and authenticated public key distribution, namely providing
authenticated responses as to the validity of a certificate.

![merkle-tree-paper](/assets/images/mt01.png)

> "The general idea in the new system is to use an infinite tree
of one-time signatures. [...] Each node of the tree performs three
functions: (1) it authenticates the left sub-node (2) it authenticates
the right sub-node (3) it signs a single message."

Merkle trees are _just_ binary trees containing _cryptographic hashes_:
* leaves contain hashes of data blocks;
* and nodes contain hashes of their children.

## Hashing Functions

> Mathematical algorithms that take inputs and provide unique outputs.
MD5, SHA-3, SHA-256.

![merkle-tree-paper](/assets/images/mt04.png)

Given that we have a data file represented by a set of _blocks_ `[L1, L2, L3, L4]`
and the result of the _hash function_ on `L1` is `h(📄L1) = a871`, by recursion
we can calculate the root value of our Merkle Tree.

![merkle-tree-paper](/assets/images/mt05.png)

# How they are useful?

## Detect inconsistencies between replicas

![merkle-tree-paper](/assets/images/mt07.png)
![merkle-tree-paper](/assets/images/mt08.png)

Dynamo, Riak, and Cassandra use this to repair bad replicas!

> Anti-entropy mechanism.

## Minimize the amount of transferred data

## Peer-to-peer file sharing

1. Fetch the root from a trusted source to access a given file;
2. Fetch chunks of data from untrusted sources;
3. If the root matches, then our file is legit.

## Copy-On-Write

Instead of taking a full copy, we can share the same tree between both
the copy and the original tree.

Since the old version is preserved, copy-on- write data structures are
also sometimes called persistent data structures.

# Where can I find them?

You can find Merkle Trees in Cassandra, Riak, IPFS, Bitcoin, Ethereum...
