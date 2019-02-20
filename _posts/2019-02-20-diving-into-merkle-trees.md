---
layout: post
title: "Diving into Merkle Trees"
date: 2019-02-20
categories: [papers, computer-science, data-structures]
---

> This is a transcript of my talk on Diving into Merkle Trees that I will give
> at Lambda Days and ScaleConf Colombia. Slides and video should be up soon!

![thesis](/assets/images/thesis.png)

Introduced in 1979 by Ralph C. Merkle in his Thesis: Secrecy, Authentications,
and Public Key Systems, the Merkle Tree, also known as a binary hash tree, is a
data structure used for efficiently _summarizing and verifying the integrity of
large sets of data_ enabling users to verify the authenticity of their received
responses.

> "The general idea in the new system is to use an
infinite tree of one-time signatures. [...] Each node of the tree performs three
functions: (1) it authenticates the left sub-node (2) it authenticates the right
sub-node (3) it signs a single message."

![tree](/assets/images/tree.png)

Initially, it was used for the purpose of one-time signatures and authenticated
public key distribution, namely providing authenticated responses as to the
validity of a certificate.

![digital-signature](/assets/images/digital-signature.png)

Ralph C. Merkle described a new digital signature that was able to sign an
unlimited number of messages and the signature size would increase
logarithmically as a function of the number of messages signed.

At this point we can identify the two main purposes of a Merkle Tree: (1)
summarize large sets of data and (2) verify that a specific piece of data
belongs to a larger data set.

## One-Way Hashing Functions

Before diving into _one-time signatures_ lets first get confortable with
_one-way functions_. Usually, a one-way function is a mathematical algorithm
that take inputs and provide unique outputs such as MD5, SHA-3, or SHA-256.

![one-way-hashing-functions](/assets/images/one-way-hashing-functions.png)

> A one-way function _F_ is a function that is
easy to compute, but difficult to invert. Given _x_ and _F_, it is easy to
compute _y=F(x)_, but given _y_ and _F_, it is effectively impossible to compute
_x_.

One-way hashing functions are especially useful within Merkle Trees for two
obvious reasons; _storage_ and _privacy_.

With systems that contain massive amounts of data, the benefits of being
able to store and identify data with a fixed length output can create vast
storage savings and help to increase efficiency.

The person who computes _y=F(x)_ is the only person who knows _x_. If _y_ is
publicly revealed, only the originator of _y_ knows _x_, and can choose to
reveal or conceal _x_ at his whim!

## One-time Signatures

Also in 1979, Leslie Lamport published his concept of _One-time Signatures_.
Most signature schemes rely in part on _one-way functions_, typically hash
functions, for their security proofs. The beauty of Lamport scheme was that this
signature was only relying on the security of these one-way functions!

> One time signatures are practical between a single pair
of users who are willing to exchange the large amount of data necessary but they
are not practical for most applications without further refinements.

> If 1000 messages are to be signed before new public
authentication data is needed, over 20,000,000 bits or 2.5 megabytes must be
stored as public information.

If _B_ had to keep 2.5 megabytes of data for 1000 other users, _B_ would have to
store 2.5 gigabytes of data. With further increases in the number of users, or
in the number of message each user wants to be able to sign, the system would
eventually become burdensome.

## Improving One-time Signatures

Merkle focused on how to eliminate the huge storage requirements in the Lamport
method and proposed an improved _One-time Signature_ that reduced the size of
signed messages by almost a _factor of 2_.

This improved method was easy to implement and cutted the size of the signed
message almost in half, although this was still too large for most applications;
instead of storing `2.5 gigabytes` of data, B only had to store `1.25 gigabytes`.

![tree-authentication](/assets/images/tree-authentication.png)

The method is called tree authentication because it's computation forms a binary
tree of recursive calls. Using this method, requires only `log2 n`
transmissions. A close look at the algorithm will reveal that half the
transmissions are redundant since we're able to compute a given parent node `A`
from their children `A1` and `A2`, so there's really no need to send `A`.

## How to compute a Merkle Root?

Given that we have a data file represented by a set of _blocks_ `[L1, L2]`.

![building-blocks-01](/assets/images/building-blocks-01.png)

We start by applying a _one-way hashing function_ to `L1`, `h(📄L1) = 9ec4`.

![building-blocks-02](/assets/images/building-blocks-02.png)

The next step is to apply the same function to `L2`, `h(📄L2) = 7e6a`.

![building-blocks-03](/assets/images/building-blocks-03.png)

To calculate the parent node, we need *always* to concatenate both child hashes
`h(📄L1)` and `h(📄L2)` before applying, once again, the _one-way hashing
function_, `h(h(📄L1) || h(📄L2)) = aea9`.

![building-blocks-04](/assets/images/building-blocks-04.png)

At this point we know the building blocks of a Merkle Tree; let’s represent it
in Elixir.

## Building a Merkle-Tree

In order to build a Merkle Tree, we need to define three new types: `Leaf`,
`Node`, and the `MerkleTree` itself.  Let's start by defining `Leaf` -- it
should contain the `hash` and the `value` of a given data block.

```elixir
defmodule MerkleTree.Leaf do
  defstruct [:hash, :value]
  @type hash :: String.t
  @type value :: String.t
  @type t :: %MerkleTree.Leaf{
    hash: hash,
    value: value
  }
end
```

The next type is `Node` -- it should contain the `left` and `right` _child_
nodes, and the `hash` value of the concatenation of both child _hashes_.

```elixir
defmodule MerkleTree.Node do
  defstruct [:hash, :left, :right]
  @type hash :: String.t
  @type left :: MerkleTree.Node.t | MerkleTree.Leaf.t
  @type right :: MerkleTree.Node.t | MerkleTree.Leaf.t
  @type t :: %MerkleTree.Node{
    hash: hash,
    left: left,
    right: right
  }
end
```

And, finally, the Merkle Tree itself.

```elixir
defmodule MerkleTree do
  defstruct [:root]
  @type root :: MerkleTree.Node.t
  @type t :: %MerkleTree{
    root: root
  }
end
```

### Hashing the data blocks

The first step to build a Merkle Tree is to _hash_ the data blocks and
converting them to _leaves_. In order to hash something we need to define a new
module `Crypto` with a single function `hash` that should accept an input and is
responsible for encoding it using the appropriate _one-way hashing function_.

```elixir
defmodule MerkleTree.Crypto do
  def hash(input, type \\ :sha256) do
    type
    |> :crypto.hash("#{input}")
    |> Base.encode16
  end
end
```

Having `blocks = ["L1", "L2", "L3", "L4"]`, the expected output would be:

```elixir
[
  %MerkleTree.Leaf{
    value: "L1",
    hash: "DFFE8596427FC50E8F64654A609AF134D45552F18BBECEF90B31135A9E7ACAA0"
  },
  %MerkleTree.Leaf{
    value: "L2",
    hash: "D76354D8457898445BB69E0DC0DC95FB74CC3CF334F8C1859162A16AD0041F8D"
  },
  %MerkleTree.Leaf{
    value: "L3",
    hash: "842983DE8FB1D277A3FAD5C8295C7A14317C458718A10C5A35B23E7F992A5C80"
  },
  %MerkleTree.Leaf{
    value: "L4",
    hash: "4A5A97C6433C4C062457E9335709D57493E75527809D8A9586C141E591AC9F2C"
  }
]
```

By defining a function `new` that accepts `blocks`, we should be able to hash
the data blocks and convert them into `Leafs`.

```elixir
defmodule MerkleTree do
  alias MerkleTree.Leaf
  alias MerkleTree.Crypto

  def new(blocks) do
    blocks
    |> Enum.map(&%Leaf.build(&1, Crypto.hash(&1)))
  end
end
```

Where `Leaf.build/2` is just:

```elixir
defmodule MerkleTree.Leaf do
  def build(value, hash) do
    %Leaf{value: value, hash: hash}
  end
end
```

Calling the function above `MerkleTree.new ["L1", "L2", "L3", "L4"]` should
yield the expected output. Although, we're not done yet.

### Hashing the nodes

Remember that for creating a `Node` we need to join both child _hashes_ and
apply the _one-way hashing function_ once again?

```elixir
defmodule MerkleTree.Node do
  alias MerkleTree.Crypto
  
  def new(nodes) do
    nodes
    |> Enum.map_join(&(&1.hash))
    |> Crypto.hash
    |> build(nodes)
  end
  
  def build(hash, [left, right]) do
    %Node{hash: hash, left: left, right: right}
  end
end
```

That's basically what `new` is doing before calling `build(nodes)`.  Once we
have the `Node` _hash_ value, we're ready to create a new `Node` with `hash`,
`left`, and `right`. As an example, by calling the function above with these two
_leaves_:

```elixir
MerkleTree.Node.new([
  %MerkleTree.Leaf{
    value: "L1",
    hash: "DFFE8596427FC50E8F64654A609AF134D45552F18BBECEF90B31135A9E7ACAA0"
  },
  %MerkleTree.Leaf{
    value: "L2",
    hash: "D76354D8457898445BB69E0DC0DC95FB74CC3CF334F8C1859162A16AD0041F8D"
  }
])
```

Would yield the following `Node`:

```elixir
%MerkleTree.Node{
  hash: "8C569660D98A20D59DE10E134D81A8CE55D48DD71E21B8919F4AD5A9097A98C8",
  left: %MerkleTree.Leaf{
    value: "L1",
    hash: "DFFE8596427FC50E8F64654A609AF134D45552F18BBECEF90B31135A9E7ACAA0"
  },
  right: %MerkleTree.Leaf{
    value: "L2",
    hash: "D76354D8457898445BB69E0DC0DC95FB74CC3CF334F8C1859162A16AD0041F8D"
  }
}
```

### All the way up

Having a way to build a `Node` from a pair of _nodes_, we can now make use of
recursion to calculate the remaining nodes up to the _Merkle root_. Let's
complete the `new` function:

```elixir
defmodule MerkleTree do
  alias MerkleTree.Leaf
  alias MerkleTree.Crypto

  def new(blocks) do
    blocks
    |> Enum.map(&%Leaf.build(&1, Crypto.hash(&1)))
    |> build
  end
end
```

Currently, this `new` function it's yielding a list of _leaves_. Let us define a
`build` function that accepts that list of leaf _nodes_ with the goal of
grouping it into several pairs of leaf _nodes_ in order to build the parent
`Node` by concatenating both `left` and `right` child _hashes_.

```elixir
defp build(nodes) do
  nodes
  |> Enum.chunk_every(2)
  |> Enum.map(&MerkleTree.Node.new(&1))
  |> build
end
```

Note that we're making use of _tail recursion_ to build our Merkle Tree from the
ground up to the _root_. Still, we need to stop that recursive processing.

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

By pattern matching a single element `root` in the list of nodes, we're now able
to stop the processing and return a `MerkleTree`.

The final `new` function would look like this:

```elixir
defmodule MerkleTree do
  alias MerkleTree.Leaf
  alias MerkleTree.Crypto

  def new(blocks) do
    blocks
    |> Enum.map(&%Leaf.build(&1, Crypto.hash(&1)))
    |> build
  end
end
```

Finally, by calling the function `MerkleTree.new ["L1", "L2", "L3", "L4"]` would
yield the following result:

```elixir
%MerkleTree{
  root: "B8EC6582F5B8ED1CDE7712275C02C8E4CC0A2AC569A23F6B7738E6B69BF132E6",
  tree: %MerkleTree.Node{
    hash: "B8EC6582F5B8ED1CDE7712275C02C8E4CC0A2AC569A23F6B7738E6B69BF132E6",
    left: %MerkleTree.Node{
      hash: "8C569660D98A20D59DE10E134D81A8CE55D48DD71E21B8919F4AD5A9097A98C8",
      left: %MerkleTree.Leaf{
        value: "L1",
        hash: "DFFE8596427FC50E8F64654A609AF134D45552F18BBECEF90B31135A9E7ACAA0"
      },
      right: %MerkleTree.Leaf{
        value: "L2",
        hash: "D76354D8457898445BB69E0DC0DC95FB74CC3CF334F8C1859162A16AD0041F8D"
      }
    },
    right: %MerkleTree.Node{
      hash: "29C5146A0AABBC4444D91087D91D2637D8EB4620A686CF6179CCD7A0BFB9B8EF",
      left: %MerkleTree.Leaf{
        value: "L3",
        hash: "842983DE8FB1D277A3FAD5C8295C7A14317C458718A10C5A35B23E7F992A5C80"
      },
      right: %MerkleTree.Leaf{
        value: "L4",
        hash: "4A5A97C6433C4C062457E9335709D57493E75527809D8A9586C141E591AC9F2C"
      }
    }
  }
}
```

## Audit Proof

As we already know, we can use a Merkle Tree to verify that a specific piece of
data belongs to a larger data set. The Merkle _audit proof_ is the missing nodes
required to compute all of the nodes between the data block and the Merkle root.
If a Merkle _audit proof_ fails to produce a _root hash_ that matches the
original Merkle _root hash_, it means that our data block is not present in the
tree.

![audit-proof](/assets/images/audit-proof.png)

In this example, we need to provide a _proof_ that the data block `L1` exists in
the tree. Since we already know the _hash value_ of `L1`, we’ll need the hash
value of `L2` in order to compute `P1`.  Now that we are able to compute `P1` we
finally need to get `P2` to compute `R`. In this specific case the Merkle _audit
proof_ is a list of nodes `[H2, P2]`.

> The use of tree authentication is now fairly clear. A given user
A transmits R to another user B. A then transmits the authentication path for
Yi. B knows R, the root of the authentication tree, by prior arrangement. B can
then authenticate Yi, and can accept any Ynth from A as genuine.

## How they are useful?

Merkle trees are especially useful in distributed, peer-to-peer systems where
the same data should exist in multiple places. By using Merkle Trees we can
detect inconsistencies between replicas, reduce the amount of transferred data
enabling peer-to-peer file sharing, and maintaining several versions of the same
tree, also called _persistent_ data-structures.

### Detect inconsistencies

Having a data file represented by a data structure we're able to **detect
inconsistencies between replicas of that same tree**. Take for example three
replicas of the same Merkle Tree -- just comparing the root nodes we can make
sure that those trees are not the same, or in this case, there are
inconsistencies between them.

![replicas-00](/assets/images/replicas-00.png)

By using an _Anti-entropy mechanism_, we're able to notice that both trees have
inconsistent data and that triggers a process that copies *only* the data needed
to repair the inconsistent tree.

![replicas-01](/assets/images/replicas-01.png)

To compare the state of two nodes, they exchange the corresponding Merkle Trees
by levels, only descending further down the tree if the corresponding hashes are
different. If two corresponding leaf nodes have different hashes, then there are
objects which must be repaired.

![replicas-02](/assets/images/replicas-02.png)

This is actually used by Dynamo, Riak, and Cassandra to repair bad replicas!

### Peer-to-peer file sharing

The principal advantage of Merkle Trees is that each branch of the tree can be
checked independently without requiring nodes to download the entire data set.
This makes _peer-to-peer file sharing_ another good use for Merkle Trees, where
we start by fetching the root of the tree from a _trusted_ source to access a
given file.

![peer-to-peer-01](/assets/images/peer-to-peer-01.png)

Since we can fetch single parts of a tree, **reducing the amount of transferred
data**, we then fetch chunks of data from untrusted sources. 

![peer-to-peer-02](/assets/images/peer-to-peer-02.png)

We start by fetching `L3` and deriving its _hash_, `b2d0`. To allow us to get to
the root, we must fetch the _hash_ value from the right leaf, `8f14`. With these
two nodes, we can derive the next _hash_ value, `165f`. By fetching the last
_hash_, `e831`, we can use it, alongside with `165f`, to derive the _root hash_,
which is indeed `9cee`.

![peer-to-peer-03](/assets/images/peer-to-peer-03.png)

We were building a _partial tree_ having just the _root hash_ and a given data
block. If the root computed from the audit path matches the true root, then the
audit path is _proof_ that the data block exists in the tree.

### Copy-On-Write

Copy-on-write data structures are also called persistent data structures, since
the old version is preserved. The idea is to share the same tree between both
the copy and the original tree, instead of taking a full copy.

![copy-on-write-01](/assets/images/copy-on-write-01.png)

Having a given tree that suffers an update to a single data block `L4`, the
branch that links to it must calculate new _hashes_ all the way up to the
_root_, although, the other branches stay intact.

![copy-on-write-02](/assets/images/copy-on-write-02.png)
![copy-on-write-03](/assets/images/copy-on-write-03.png)

If we take a closer look we can see that we’re adding only a new data block
and three new hashes for the new version of the data structure. All the other
data blocks, eventually, gigabytes of data are being shared between both versions!

## Wrapping up

![wrapping-up](/assets/images/wrapping-up.png)

Merkle trees are _just_ binary trees containing an infinite number of
_cryptographic hashes_ where _leaves_ contain hashes of data blocks and _nodes_
contain hashes of their children. They also produce a _Merkle Root_ that summarizes
the entire data set and that's publicly distributed across the network and can easily
prove that a given data block exists in the tree.

You can find them in Cassandra, IPFS, Riak, Ethereum, Bitcoin, Open ZFS, and
much more. Also, you have lots of papers to read as well if you want to dive
even deeper.

Have fun!

## References

* [Secrecy, Authentications, and Public Key Systems](http://www.merkle.com/papers/Thesis1979.pdf)
* [A Certified Digital Signature](http://www.merkle.com/papers/Certified1979.pdf)
* [A Digital Signature Based on a Conventional Encryption Function](http://people.eecs.berkeley.edu/~raluca/cs261-f15/readings/merkle.pdf)
* [Providing Authentication and Integrity in Outsourced Databases using Merkle
Hash Tree’s](http://people.eecs.berkeley.edu/~raluca/cs261-f15/readings/merkleodb.pdf)
* [Manual repair: Anti-entropy repair](https://docs.datastax.com/en/cassandra/3.0/cassandra/operations/opsRepairNodesManualRepair.html)
* [Active Anti-Entropy](http://docs.basho.com/riak/kv/2.2.3/learn/concepts/active-anti-entropy/)
