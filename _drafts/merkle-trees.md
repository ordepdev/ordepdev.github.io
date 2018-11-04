---
layout: post
title: "Diving into Merkle Trees"
date: 2018-11-03
categories: [papers, computer-science, data-structures]
---

> This post is a transcript of an internal talk
I gave at Talkdesk. Each week, we pick a topic that
should be presented to the rest of the team. You can
find the slides [here](https://speakerdeck.com/ordepdev/diving-into-merkle-trees).

# The Merkle Tree

Introduced in 1987 by Ralph C. Merkle, the merkle tree,
also known as a binary hash tree, is a data structure 
used for efficiently _summarizing and verifying the
integrity of large sets of data_. Initially, it was
used for the purpose of one-time signatures and
authenticated public key distribution, namely providing
authenticated responses as to the validity of a certificate.

![merkle-tree-paper](/assets/images/mt01.png)

> "The general idea in the new system is to use an
infinite tree of one-time signatures. [...] Each node
of the tree performs three functions: (1) it
authenticates the left sub-node (2) it authenticates
the right sub-node (3) it signs a single message."

Merkle trees are _just_ binary trees containing
_cryptographic hashes_:

* leaves contain hashes of data blocks;
* and nodes contain hashes of their children.

## One-Way Hashing Functions

> A one-way function _F_ is a function that is
easy to compute, but difficult to invert. Given
_x_, computing _y=F(x)_ is easy. Given _y_,
determining any _x_ such that _F(x)=y_ is hard.

> Mathematical algorithms that take inputs and
provide unique outputs. (MD5, SHA-3, SHA-256)

![merkle-tree-paper](/assets/images/mt04.png)

Given that we have a data file represented by
a set of _blocks_ `[L1, L2, L3, L4]` and the
result of the _hash function_ on `L1` is
`h(📄L1) = a871`, by recursion we can calculate
the root value of our Merkle Tree.

![merkle-tree-paper](/assets/images/mt05.png)

Keep in mind that to calculate a given _parent_
node, we always need to concatenate both child
_hashes_ before calculating a new _hash_. Take
for example the node with value `e831`. This
_hash_ was calculated by simply taking both
`h(L1)` and `h(L2)` and calling 
`h(h(L1) ++ h(L2))`.

# How they are useful?

Merkle trees are especially useful in distributed,
peer-to-peer systems where the same data should exist
in multiple places. By using Merkle Trees we can
detect inconsistencies between replicas, reduce
the amount of transferred data enabling peer-to-peer
file sharing, and maintaining several versions of the
same tree, also called _persistent_ data-structures.

## Detect inconsistencies

Having a data file represented by a data
structure we're able to **detect inconsistencies
between replicas of that same tree**. Take for
example two replicas of the same Merkle Tree
-- just comparing the root nodes we can make
sure that those trees are not the same, or in
this case, there are inconsistencies between them.

![merkle-tree-paper](/assets/images/mt07.png)
![merkle-tree-paper](/assets/images/mt08.png)

By using an Anti-entropy mechanism, we're able
to notice that both trees have inconsistent
data and that triggers a process that copies
*only* the data needed to repair the
inconsistent tree. This is actually used by
Dynamo, Riak, and Cassandra to repair bad
replicas!

## Peer-to-peer file sharing

Another good use for Merkle Trees is
**peer-to-peer file sharing**, where we start
by fetching the root of the tree from a
*trusted* source to access a given file.

![merkle-tree-paper](/assets/images/mt09.png)

Since we can fetch single parts of a tree,
**reducing the amount of transferred data**, we
then fetch chunks of data from untrusted
sources. 

![merkle-tree-paper](/assets/images/mt10.png)

We start by fetching `L3` and deriving its
_hash_, `b2d0`. To allow us to get to the root,
we must fetch the _hash_ value from the right
leaf, `8f14`. With these two nodes, we can
derive the next _hash_ value, `165f`. By
fetching the last _hash_, `e831`, we can use
it, alongside with `165f`, to derive the _root
hash_, which is indeed `9cee`.

![merkle-tree-paper](/assets/images/mt11.png)

 We were building a _partial tree_ having just
the _root hash_ and a given data block. After
deriving the _hashes_ from the nodes below the
_root_ -- if the root matches, then our file
is legit.

## Copy-On-Write

Having a given tree that suffers an update to
a single data block `L4`, the branch that links
to it must calculate new _hashes_ all the way
up to the _root_, although, the other branches
stay intact.

![merkle-tree-paper](/assets/images/mt13.png)

Since the other branches stay intact, instead
of taking a full copy, we can share the same
tree between both the copy and the original
tree.

|                            |                            |
:---------------------------:|:---------------------------:
![x](/assets/images/mt14.png)|![y](/assets/images/mt15.png) 

Since the old version is preserved,
_copy-on-write_ data structures are also
called _persistent_ data structures.


# Where can I find them?

You can find Merkle Trees in Cassandra, Riak,
IPFS, Bitcoin, Ethereum...

* [A Digital Signature Based on a Conventional Encryption Function](http://people.eecs.berkeley.edu/~raluca/cs261-f15/readings/merkle.pdf)
* [Providing Authentication and Integrity in Outsourced Databases using Merkle
Hash Tree’s](http://people.eecs.berkeley.edu/~raluca/cs261-f15/readings/merkleodb.pdf)
* [Manual repair: Anti-entropy repair](https://docs.datastax.com/en/cassandra/3.0/cassandra/operations/opsRepairNodesManualRepair.html)
* [Active Anti-Entropy](http://docs.basho.com/riak/kv/2.2.3/learn/concepts/active-anti-entropy/)
