---
layout: post
title: "Diving into Merkle Trees"
date: 2018-11-04
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

## Building a Merkle-Tree

In order to build a Merkle tree, we need to define
three new types: `Leaf`, `Node`, and `MerkleTree`.

Let's start by defining `Leaf` -- it should contain
the _hash_ value of a given data block. In this
implementation, I'll ignore the link between a `Leaf`
and a _data block_, let's just assume that a `Leaf`
type is representing the _hashing_ value of a
_data block_.

```elixir
defstruct [:hash]

@type hash :: String.t
@type t :: %MerkleTree.Leaf{
  hash: hash
}
```

The next type is `Node` -- it should contain the `left`
and `right` _child_ nodes _or_ leaves, and the _hash_
value of the concatenation of both child _hashes_.

```elixir
defstruct [:hash, :left, :right]

@type hash :: String.t
@type left :: MerkleTree.Node.t | MerkleTree.Leaf.t
@type right :: MerkleTree.Node.t | MerkleTree.Leaf.t
@type t :: %MerkleTree.Node{
  hash: hash,
  left: left,
  right: right
}
```

And, finally, the Merkle Tree itself. For simplicity,
it should contain its _Merkle root_ and the actual tree
representation, starting with the _root_ until the _leaves_.

```elixir
defstruct [:root, :tree]

@type root :: String.t
@type tree :: MerkleTree.Node.t
@type t :: %MerkleTree{
  root: root,
  tree: tree
}
```

### Hashing the blocks

The first step to build a Merkle Tree is to _hash_ the
data blocks and converting them to _leaves_. Having
`blocks = [1,2,3,4]`, the expected output would be:

```elixir
[
  %MerkleTree.Leaf{
    hash: "6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B"
  },
  %MerkleTree.Leaf{
    hash: "D4735E3A265E16EEE03F59718B9B5D03019C07D8B6C51F90DA3A666EEC13AB35"
  },
  %MerkleTree.Leaf{
    hash: "4E07408562BEDB8B60CE05C1DECFE3AD16B72230967DE01F640B7E4729B49FCE"
  },
  %MerkleTree.Leaf{
    hash: "4B227777D4DD1FC61C6F884F48641D02B4D121D3FD328CB08B5531FCACDABF8A"
  }
]
```

By defining a function `new` that accepts `blocks`, it
should apply one `map` to _hash_ the values and another
one to convert the _hash_ value to a proper `Leaf`.

```elixir
defmodule MerkleTree do
  def new(blocks) do
    blocks
    |> Enum.map(&Crypto.hash(&1))
    |> Enum.map(&%MerkleTree.Leaf{hash: &1})
  end
end
```

Calling the function above `MerkleTree.new [1,2,3,4]` should yield
the expected output. Although, we're not done yet. The next step is
to take two _leaves_ and convert them to a `Node`. 
```elixir
defmodule MerkleTree.Node do
  @spec new([MerkleTree.Leaf.t, ...]) :: MerkleTree.Node.t
  @spec new([MerkleTree.Node.t, ...]) :: MerkleTree.Node.t
  def new(nodes) do
    nodes
    |> Enum.map_join(&(&1.hash))
    |> Crypto.hash
    |> build(nodes)
  end

  @spec build(String.t, [MerkleTree.Leaf.t, ...]) :: MerkleTree.Node.t
  @spec build(String.t, [MerkleTree.Node.t, ...]) :: MerkleTree.Node.t
  defp build(hash, [left, right]) do
    %MerkleTree.Node{hash: hash, left: left, right: right}
  end
end
```
Remember that for creating a `Node` we need to join both child
_hashes_ and apply the _hashing function_ once again. That's basically
what `new` is doing before calling `build(nodes)`. Once we have the
`Node` _hash_ value, we're ready to create a new `Node` with `hash`,
`left`, and `right`. As an example, by calling the function above
with these two _leaves_:

```elixir
MerkleTree.Node.new([
  %MerkleTree.Leaf{
    hash: "6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B"
  },
  %MerkleTree.Leaf{
    hash: "D4735E3A265E16EEE03F59718B9B5D03019C07D8B6C51F90DA3A666EEC13AB35"
  }
])
```

Would yield the following `Node`:

```elixir
%MerkleTree.Node{
  hash: "F5FC2A0E6D4568040ED7B8D2C59A16B73B8C9EC9BB69B4F9FE7C3ADD5C9F2C4E",
  left: %MerkleTree.Leaf{
    hash: "6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B"
  },
  right: %MerkleTree.Leaf{
    hash: "D4735E3A265E16EEE03F59718B9B5D03019C07D8B6C51F90DA3A666EEC13AB35"
  }
}
```

### All the way up

Having a way to build a `Node` from a pair of `Node`/`Leaf`,
we can now make use of recursion to calculate the nodes up
to the _Merkle root_. Let's complete the `new` function:

```elixir
defmodule MerkleTree do
  def new(blocks) do
    blocks
    |> Enum.map(&Crypto.hash(&1))
    |> Enum.map(&%MerkleTree.Leaf{hash: &1})
  end
end
```

Currently, this `new` function its yielding a list of
_leaves_. Having that list of _leafs_, the next step is
to convert it into another list that contains _several_
lists of `Node`/`Leaf`. Confusing? Let us define a `build`
function that accepts that list of `Node`/`Leaf`.

```elixir
defp build(nodes) do
  nodes
  |> Enum.chunk_every(2)
  |> Enum.map(&MerkleTree.Node.new(&1))
  |> build
end
```

The goal is to group the list of _nodes_ into sublists
of _nodes_ in order to have `left` and `right` _nodes_.
Having both `left` and `right`, we're able to build a
proper `Node` by concatenating both _child_ _hashes_.

Note that we're making use of _tail recursion_ to build
our Merkle Tree from the ground up to the _root_. Still,
we need to stop that recursive processing.

```elixir
defp build([root]) do
  %MerkleTree{root: root.hash, tree: root}
end
defp build(nodes) do
  nodes
  |> Enum.chunk_every(2)
  |> Enum.map(&MerkleTree.Node.new(&1))
  |> build
end
```

By adding another `build` signature that pattern matches
the argument to a single element list `root`, we're now
able to stop the processing and return both the `root.hash`
and the `root` itself.

The final `new` function would look like this:

```elixir
defmodule MerkleTree do
  def new(blocks) do
    blocks
    |> Enum.map(&Crypto.hash(&1))
    |> Enum.map(&%MerkleTree.Leaf{hash: &1})
    |> build
  end
end
```

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
