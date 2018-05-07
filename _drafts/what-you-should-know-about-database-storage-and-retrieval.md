---
layout: post
title: "What you should know about database storage and retrieval."
date: 2018-05-07
categories: [databases, data structures, papers]
---

## Why should you care?

## Log-Structured File

In 1991, Mendel Rosenblum and John K. Ousterhout  introduced a new technique 
for disk storage management called _log-structured file system_.

> A log-structured file system writes all modifications to disk sequentially
in a log-like structure, thereby speeding up both file writing and crash
recovery.

![log-structured-file](/assets/images/log-structured-file.png)

The idea of the log-structured file system is to collect large amounts of 
new data in a file cache in main memory, then write the data to disk in a 
single large I/0.

## How do we avoid running out of space?

![log-structured-file-compactation](/assets/images/log-structured-file-compactation.png)

The log-structured system solution is to break the log into several immutable
segments of a certain size by closing a segment file when it reaches a certain size,
and making subsequent writes to a new segment file.

![log-structured-file-merging-and-compactation](/assets/images/log-structured-file-merging-and-compactation.png)

Since compactation makes segments much smaller, we can also merge several
segments together at the same time as performing the compactation. This process
can be done in a background thread while we can still serve read and write
requests using the old segment files.

## Why using an append-only log?

The immutable append-only design turns out to be good for several reasons!

1. Sequential write operations are much faster than random writes;
2. Concurrency and crash recovery are much simpler;
3. Merging old segments avoids fragmentation over time.

## How do we find the value of a given key?

The solution is to introduce an additional data structure that is derived from
data: the _index_; the idea is to keep some additional metadata on the side that
helps to locate the data. Although, maintaining such structures incurs
overhead, especially on write!

## Hash Indexes

The simplest possible indexing strategy is to keep an in-memory hash map where
each key is mapped to a byte offset in the data file. The hash map is used to
find the offset in the data file, seek to that location, and read the value.

![hash-indexes](/assets/images/hash-indexes.png)

Note that the hash map is always updated when a new key-value pair is appended
to the file in order to reflect the current data offset.

This solution may sound too simplistic, right? Actually, it is a viable approach.
In 2010, Basho Technologies, a distributed systems company that developed a
key-value NoSQL database technology, Riak, wrote a paper that introduced Bitcask,
the default storage engine of Riak. Bitcask uses this concept of an in-memory hash map
and offers high-performance reads and writes. The tradeoff is that all keys must fit
in memory.

![bitcask-paper](/assets/images/bitcask-paper.png)

> When a write occurs, the keydir is atomically updated with the location of
the newest data. The old data is still present on disk, but any new reads will
use the latest version available in the keydir.

Although, the in-memory hash map strategy has some limitations. As we saw from 
the Bitcask example, all keys must fit in the in-memory hash map, so this 
indexing strategy is not suitable for a very large number of keys and since 
the keys are not sorted, scanning over a range of keys it’s not efficient — 
it would be necessary to look up each key individually in the in-memory 
hash maps.

## Sorted-String Tables

In 2006, Google wrote the Bigtable paper where introduced among other things,
the _SSTable_ - _Sorted String Table_; a sequence of key-value pairs that are
sorted by key.

![bigtable-paper](/assets/images/bigtable-paper.png)

> An SSTable provides a persistent, ordered immutable map from keys to values,
where both keys and values are arbitrary byte strings.

> A lookup can be performed by first finding the appropriate block with a
binary search in the in-memory index, and then reading the appropriate block
from disk.

![sparse-in-memory-index](/assets/images/sparse-in-memory-index.png)

The recently committed records are stored in memory in a sorted buffer called
a _memtable_. The _memtable_ maintains the updates on a row-by-row basis, where each
row is copy-on-write to maintain row-level consistency. Older updates are
stored in a sequence of immutable _SSTables_.

As recently committed records are being stored in the _memtable_, it's size
increases and when the size reaches a threshold:

1. the _memtable_ is frozen;
2. a new _memtable_ is created;
3. and the frozen _memtable_ is converted to a _SSTable_ and persisted on disk.

A lookup can be performed with a single disk seek by first finding the
appropriate block by performing a binary search in the in-memory index and then
reading the appropriate block from disk.

![sstable-merging-and-compactation](/assets/images/sstable-merging-and-compactation.png)

Since the segments are sorted by key, the merging approach is like the one used
in the mergesort algorithm:

1. we start reading the segment files side by side;
2. look at the first key in each file;
3. copy the lowest key to the new segment file;
4. and repeat.

## LSM-Tree

Storage engines that are based on this principle of merging and compacting sorted
files are often called LSM storage engines. This concept was introduced in 2006
in The Log-Structured Merge-Tree paper; a disk-based data structure designed to
provide low-cost indexing experiencing a high rate of record inserts
over an extended period.

![lsm-tree-paper](/assets/images/lsm-tree-paper.png)

> The LSM-tree uses an algorithm that defers and batches index changes, cascading
the changes from a memory-based component through one or more disk components in
an efficient manner reminiscent of merge sort.

## What about performance?

The algorithm can be slow when looking for keys that do not exist in the database.
Before we can make sure that the key does not exist, we first we need to check
the memtable and the segments all the way back to the oldest. The solution is 
to introduce another data structure: the _Bloom Filter_ - a memory-efficient 
data structure for approximating the contents of a set.

> A Bloom filter allows us to ask whether an SSTable might contain any data 
for a specified row/column pair. For certain applications, the small amount 
of tablet server memory used for storing Bloom filters drastically reduces 
the number of disk seeks required for read operations. Our use of Bloom 
filters also avoids disk accesses formost lookups of non-existent rows 
or columns.

Basically, the _Bloom Filter_ can tell us if a key does not exist in the 
database, saving many unnecessary disk reads for non-existent keys. However, 
because the _Bloom Filter_ is a probabilistic function, it can result in 
false positives.

## B-Trees

In 1970, a paper on _Organization and Maintenance of Large Ordered Indices_,
introduced the concept of _B-Trees_ that less than 10 years have become, _de 
facto_, a standard for file organization. They still remain the standard
index implementation in almost all relational databases, and many non 
relational databases use them too as well.

![b-trees-papers](/assets/images/b-trees-papers.png)

> The index is organized in pages of a fixed size capable of holding up to 
2k keys, but pages need only be partially filled. 

Basically, _B-trees_ break the database down into fixed-size pages, and 
read or write one page at a time!

![b-trees](/assets/images/b-trees.png)

Each page can be identified using an address that allows one page to refer 
another page. One of those pages is designated as the _root_ of the _B-tree_ and 
whenever we want to look up a key in the index, we start from there.

![b-trees-animation](/assets/images/b-trees-animation.gif)

In order to add a new key, we need to find the page within the key range
and split into two pages if there’s no space to accommodate it. This is 
the only way in which the height of the tree can increase.

## What about resilience?

If we need to split a page because an insertion caused it to be overfull, 
we need to write the two pages that were split, and also overwrite their 
parent page to update the references to the two child pages. Overwritten 
several pages at once it's a dangerous operation that can result in a 
corrupted _index_ if the database crashes.

The solution to tackle this problem is to introduce an additional structure -
the _Write-Ahead Log_ (WAL); where all modifications will be written before it
can be applied to the tree itself. If the database crashes, the WAL  will be
used to restore the _tree_ back to a consistent state.

But writing all modifications to the WAL introduces other problem - _write
amplification_; when one write to the database results in multiple writes 
to disk which has a direct performance cost.

## Wrapping Up

With this brief introduction on several types of data storage engines, we can take
some conclusions:

* Writes are slower on _B-Trees_ since they must write every piece of data at 
least twice;
* Reads are slower on _LSM-Trees_ since they have to check the _memtable_, 
_bloom filter_, and possibly multiple _SSTables_  with different sizes;
* _LSM-Trees_ are able to sustain higher write throughput due to lower _write
amplification_ and sequential writes, but they can consume lots of resources
on merging and compaction processes, especially if the throughput is very high
and it's size is getting bigger.

## What's next?

> There is no quick and easy rule for determining which type of storage engine 
is better for your use case, so it is worth testing empirically.

You should read papers, and this list may help you with that:

* [Log-Strucured File System](https://people.eecs.berkeley.edu/~brewer/cs262/LFS.pdf)
* [Bitcask](https://github.com/basho/bitcask/blob/develop/doc/bitcask-intro.pdf)
* [Bigtable: A Distributed Storage System for Structured Data](https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf)
* [The log-structured merge-tree](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.44.2782&rep=rep1&type=pdf)
* [Organization and Maintenance of Large Ordered Indices](http://www.inf.fu-berlin.de/lehre/SS10/DBS-Intro/Reader/BayerBTree-72.pdf)
* [Ubiquitous B-Tree](http://www.ezdoum.com/upload/14/20020512204603/TheUbiquitousB-Tree.pdf)
