# Why should you care?

# Log-Structured File

{log-structured-file-paper}

In 1991, this paper was presenting a new technique for disk storage management
called log-structured file system.

> A log-structured file system writes all modifications to disk sequentially
in a log-like structure, thereby speeding up both file writing and crash
recovery.

The idea is to collect large amounts of new data in a file cache in main
memory, then write the data to disk in a single large I/0.

# How do we avoid running out of space?

{log-structured-file-compactation}

The log-structured system solution is to break the log into several immutable
segments of certain size by closing a segment file when it reaches a certain size,
and making subsequent writes to a new segment file.

{log-structured-file-merging-and-compactation}

Since compactation makes segments much smaller, we can also merge several
segments together at the same time as performing the compactation. This process
can be done in background thread while we can still serve read and write
requests using the old segment files.

# Why using an append-only log?

The immutable append-only design turns out to be good for several reasons!

1. Sequential write operations are much more faster than random writes.
2. Concurrency and crash recovery are much simpler.
3. Merging old segments avoids fragmentation.

# How do we find the value of a given key?

The solution is to introduce an additional data structure that is derived from
data: the index; the idea is to keep some additional metadata on the side that
helps to locate the data. Although, maintaining such structures incurs
overhead, especially on write!

# Hash Indexes

The simplest possible indexing strategy is to keep an in-memory hash map where
each key is mapped to a byte offset in the data file. The hash map is used to
find the offset in the data file, seek to that location, and read the value.

{hash-index-in-memory-hash-map-log-structured-file}

Note that the hash map is always updated when a new key-value pair is appended
to the file in order to reflect the current data offset.

This solution may sound too simplistic, right? Actually it is a viable approach.
In 2010, Basho Technologies, a distributed systems company that developed a
key-value NoSQL database technology, Riak, wrote a paper that introduced Bitcask,
the default storage engine of Riak. Bitcask uses this concept of in-memory hash map
and offers high-performance reads and writes. The trade off is that all keys must fit
in memory.

{bitcask-paper}

> When a write occurs, the keydir is atomically updated with the location of
the newest data. The old data is still present on disk, but any new reads will
use the latest version available in the keydir.

# Hash Indexes Limitations

As we saw from the Bitcask example, all keys must fit in the in-memory hash map,
so this indexing strategy is not suitable for a very large number of keys and
since the keys are not sorted, scanning over a range of keys it’s not efficient
 — it would be necessary to look up each key individually in the in-memory
hash maps.

# Sorted-String Tables

In 2006, Google wrote the Bigtable paper where introduced among other things,
the SSTable - Sorted String Table; a sequence of key-value pairs that are
sorted by key.

{bigtable-paper}

> An SSTable provides a persistent, ordered immutable map from keys to values,
where both keys and values are arbitrary byte strings.

> A lookup can be performed by first finding the appropriate block with a
binary search in the in-memory index, and then reading the appropriate block
from disk.

{sparse-in-memory-hash-map}

The recently committed records  are stored in memory in a sorted buffer called
a memtable. A memtable maintains the updates on a row-by-row basis, where each
row is copy-on-write to maintain row-level consistency. Older updates are
stored in a sequence of immutable SSTables.

As recently committed records are being stored in the memtable, it's size
increases and when the size reaches a threshold:

1. the memtable is frozen;
2. a new memtable is created;
3. and the frozen memtable is converted to an SSTable and persisted on disk.

A lookup can be performed with a single disk seek by first finding the
appropriate block by performing a binary search in the in-memory index and then
reading the appropriate block from disk.

{merging-and-compactation-gif}

Since the segments are sorted by key, the merging approach is like the one used
in the mergesort algorithm:

1. we start reading the segment files side by side;
2. look at the first key in each file;
3. copy the lowest key to the new segment file;
4. and repeat.

# LSM-Tree

Storage engines that are based on this principle of merging and compacting sorted
files are often called LSM storage engines. This concept was introduced in 2006
in The Log-Structured Merge-Tree paper; a disk-based data structure designed to
provide low-cost indexing for file experiencing a high rate of record inserts
over an extended period.

> The LSM-tree uses an algorithm that defers and batches index changes, cascading
the changes from a memory-based component through one or more disk components in
an efficient manner reminiscent of merge sort.

# What about performance?

The algorithm can be slow when looking for keys that do not exist in the database.
Before we can make sure that the key does not exist, we first we need to check
the memtable and the segments all the way back to the oldest.

The solution for this problem was to introduce another data structure: the
Bloom Filter.

> Memory-efficient data structure for approximating the contents of a set.

Basically, it can tell if a key does not exist in the database, saving many
unnecessary disk reads for nonexistent keys. However, because the Bloom filter
is a probabilistic function, it can result in false positives.

# B-Trees



# Comparisons


