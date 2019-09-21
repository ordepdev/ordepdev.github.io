---
layout: post
title: "Tales from running Kafka Streams in Production"
date: 2019-09-20
categories: [real-time, streaming, kafka]
---

## Why using Kafka Streams in the first place?

If you're running a Kafka cluster, Kafka Streams gets handy mainly for three
reasons: (1) it's an high level wrapping of consumers/producers on top of Kafka,
(2) it supports statefull streams using RocksDB, and (3) supports partition
assignments across your processing nodes.

## Plan the # of partitions in advance

In order to scale your processing you can either (1) move towards a stronger CPU,
more memory, and faster disk, or (2) increase the number of processing instances,
but always have in mind that a single Kafka partition can only be processed by
one consumer - that's why the number of partitions is important - if the number
of partitions is low, maybe a consumer can't handle your throughput. Make sure you
plan the number of partitions in advance or your consumer lag will grow.

## Be careful with your persisted schemas

When processing and storing specific events in a state store you must be very
careful with the event schema, specially if you rely on JSON format. Making
breaking changes to the event schema means that the processing layer will fail
to parse the JSON when reading from the state store, and it will probably lead
to lost data if you ignore the event or into a crash loop if you retry the
processing.

## Don't rely on internal changelogs for downstream processing

For each state store, it maintains a replicated changelog Kafka topic in which
it tracks any state updates. Every time we insert a _key-value_ into our state
store, a Kafka message is sent to the corresponding topic. In case of any crash,
our application will rebuild the state store from the corresponding changelog
topic. If we want to apply another processing layer, either in the current application
or another one downstream, we should always use `context.forward(k, v)` (using the
`Processor API`) to forward our processor output to a given _sink_ topic.

## State Stores don't have TTL

While the state store changelog topic has _log compaction_ so that old data can be
purged to prevent the topics from growing indefinitely, the state store itself don't
have this kind of mechanism and yes, it will grow forever, unless the application
crashes and the state store is rebuilt using a now, shorter version of the changelog.

([https://stackoverflow.com/questions/50622369/kafka-streams-is-it-possible-to-have-compact-delete-policy-on-state-stores](https://stackoverflow.com/questions/50622369/kafka-streams-is-it-possible-to-have-compact-delete-policy-on-state-stores))

> Log compaction ensures that Kafka will always retain at least the last known
> value for each message key within the log of data for a single topic partition.
> It addresses use cases and scenarios such as restoring state after application
> crashes or system failure, or reloading caches after application restarts during
> operational maintenance. Let's dive into these use cases in more detail and then
> describe how compaction works.

(PLACEHOLDER) There is an ongoing effort to add TTL to state stores!

## The restore process

Every time the application starts, or in the worst case restarts, the states stores
will be restored using the corresponding changelog. If we pay attention, we'll notice
that a given processor that relies on a given state store, doesn't start processing
while the state store is recovering. In order to give more awareness, we might want to
add a custom `StateRestoreListener` to track the state store restore process.

```scala
import com.typesafe.scalalogging.Logger
import org.apache.kafka.common.TopicPartition
import org.apache.kafka.streams.processor.StateRestoreListener

class LoggingStateRestoreListener extends StateRestoreListener {

  val logger = Logger(classOf[LoggingStateRestoreListener])

  override def onRestoreStart(topicPartition: TopicPartition,
                              storeName: String,
                              startingOffset: Long,
                              endingOffset: Long): Unit = {
    logger.info(s"Restore started for $storeName and partition ${topicPartition.partition}...")
    logger.info(s"Total records to be restored ${endingOffset - startingOffset}.")
  }

  override def onBatchRestored(topicPartition: TopicPartition,
                               storeName: String,
                               batchEndOffset: Long,
                               numRestored: Long): Unit = {
    logger.info(
      s"Restored batch $numRestored for $storeName and partition ${topicPartition.partition}.")
  }

  override def onRestoreEnd(topicPartition: TopicPartition,
                            storeName: String,
                            totalRestored: Long): Unit = {
    logger.info(s"Restore completed for $storeName and partition ${topicPartition.partition}.")
  }
}
```

You'll be amazed, or outraged, with the amount of time wasted on restoring large
changelogs. Note to self: if you're running Kafka Streams on top of Kubernetes, make
sure you have persistent storage, otherwise these restore processes will kill your SLAs.

In a disaster scenario, when a particular instance crashes, configuring
`num.standby.replicas` may minimize the restore process by introducing shadow copies
of the local state stores.

## Oh, the memory overhead

Assigning large heaps to the JVM sounds reasonable at first, although Kafka Streams
utilize lots of _off-heap_ memory when using RocksDB which eventually leads to crashed
applications lacking free memory.

RocksDB stores data at least in four data structures (1) `memstore`, (2) `bloomfilter`,
(3) `index`, and  (4) `blockcache`. Besides that, it has lots of configurable
properties which makes a difficult job to properly tune it.

> Unfortunately, configuring RocksDB optimally is not trivial. Even we as RocksDB
> developers don't fully understand the effect of each configuration change. If
> you want to fully optimize RocksDB for your workload, we recommend experiments
> and benchmarking, while keeping an eye on the three amplification factors.

([https://github.com/facebook/rocksdb/wiki/RocksDB-Tuning-Guide](https://github.com/facebook/rocksdb/wiki/RocksDB-Tuning-Guide))

On the other hand, if you don't tune it, the memory usage of our application
will grow, and grow, and grow. So, we need to make sure we know the number of source
topics our application is consuming from, as the number of partitions and state stores.

> If you have many stores in your topology, there is a fixed per-store memory cost. E.g., if RocksDB is your default store, it uses some off-heap memory per store. Either consider spreading your app instances on multiple machines or consider lowering RocksDb’s memory usage using the RocksDBConfigSetter class.

> If you take the latter approach, note that RocksDB exposes several important memory configurations. In particular, these settings include block_cache_size (16 MB by default), write_buffer_size (32 MB by default) write_buffer_count (3 by default). With those defaults, the estimate per RocksDB store (let’s call it estimate per store) is (write_buffer_size_mb * write_buffer_count) + block_cache_size_mb (112 MB by default).

> Then if you have 40 partitions and using a windowed store (with a default of 3 segments per partition), the total memory consumption is 40 * 3 * estimate per store (in this example that would be 13440 MB).

([https://docs.confluent.io/current/streams/sizing.html](https://docs.confluent.io/current/streams/sizing.html))

Having configured `ROCKSDB_BLOCK_CACHE_SIZE_MB`, `ROCKSDB_BLOCK_SIZE_KB`, `ROCKSDB_WRITE_BUFFER_SIZE_MB`, and `ROCKSDB_WRITE_BUFFER_COUNT` to the best possible values, we're able
to estime the cost of a single store. Obviously, if we have lots of streams with lots
of stores, it will require lots of memory.

## Don't forget the disk space

Consuming from large source topics and performing processing that requires storing `n`
records in RocksDB for each message, will lead to a fairly large amount of data stored
in disk. Without the proper monitoring, it is very easy to run out of space.

## Timeouts and rebalances

From time to time, applications get stuck in a rebalancing state leading to several
timeouts.

Often it's caused by processing very large batches of messages that take more
than the five minutes threshold to commit. When the processing is finished, the stream
is already considered _dead_ and the message can't be committed. On rebalance, the same
message is fetched once again from Kafka and the same error would occur.

Reducing the `max.poll.records` value, often to `1` would sometimes _alleviate_ this
specific issue ¯\_(ツ)_/¯.

## Still, ...

Building _real-time_ applications with Kafka Streams is quick, easy, powerful, and very
natural after grasping the non-trivial stuff that comes with the full package.
