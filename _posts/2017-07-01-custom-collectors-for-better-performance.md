---
layout: post
title:  "Custom collectors for better performance"
date:   2017-07-01
---

On our everyday job we keep collecting data with streams either with `toList()` or `groupingBy()`
but actually we can even develop our own collector. In order to know how, we must understand
the methods provided by the `Collector` interface.

```java
public interface Collector<T, A, R> {
   Supplier<A> supplier();
   BiConsumer<A, T> accumulator();
   BinaryOperator<A> combiner();
   Function<A, R> finisher();
   Set<Characteristics> characteristics();
}
```

`<T>` is the type of input elements to the reduction operation.

`<A>` is the mutable accumulation type of the reduction operation.

`<R>` is the result type of the reduction operation.

At this point it's obvious that a collector like `toList()` implements the interface as `Collector<T, List<T>, List<T>>`

---

### Supplier

The supplier method has to return a `Supplier` of an empty accumulator used during the collection process.
This empty accumulator will also represent the result of the collection process when performed against an empty stream.

---

### Accumulator

The accumulator method returns the function that performs the reduction operation. It's internal state is changed in order
to reflect the effect of the traversed element.

---

### Finisher

The finisher method returns a function in order to transform the accumulator object into the final result of the whole operation.

---

### Combiner

The combiner method defines how the accumulators resulting from the reduction of different subparts of the stream are combined when the subparts are processed in parallel.

---

# Implementing the custom collector

Having a class `Result` that encapsulates three result values: a, b and c; we want to reduce a collection of results into a single combined result.

```java
class Result {
    private long a;
    private long b;
    private long c;

    Result combine(Result result) {
        return new Result(
            this.a += result.a,
            this.b += result.b,
            this.c += result.c
        );
    }
}
```

At first we need to create a new collector class `ResultCollector` that receives a `Result`, combine two `Result` instances into a new `Result` and returns the final result which is also a new `Result`.

```java
class ResultCollector<T> implements Collector<Result, Result, Result>
```

The supplier method returns an empty result.

```java
@Override
public Supplier<Result> supplier() {
    return Result::new;
}
```

The accumulator method calls the `Result.combine(result)` method in order to sum both result values.

```java
@Override
public BiConsumer<Result, Result> accumulator() {
    return Result::combine;
}
```

The combiner method does the same as the accumulator by receiving two partial results and sum both values.

```java
@Override
public BinaryOperator<Result> combiner() {
    return Result::combine;
}
```

The finisher method just returns the accumulator object.

```java
@Override
public Function<Result, Result> finisher() {
    return Function.identity();
}
```

The characteristics method indicates that the accumulator object is directly used as the final result of the reduction process.

```java
@Override
public Set<Characteristics> characteristics() {
    return EnumSet.of(IDENTITY_FINISH);
}
```

---

### All together

```java
class ResultCollector<T> implements Collector<Result, Result, Result> {

    @Override
    public Supplier<Result> supplier() {
        return Result::new;
    }

    @Override
    public BiConsumer<Result, Result> accumulator() {
        return Result::combine;
    }

    @Override
    public BinaryOperator<Result> combiner() {
        return Result::combine;
    }

    @Override
    public Function<Result, Result> finisher() {
        return Function.identity();
    }

    @Override
    public Set<Characteristics> characteristics() {
        return EnumSet.of(IDENTITY_FINISH);
    }
}
```

---

### Using the custom collector

```java
Result result = IntStream.range(0, 1_000_000)
    .mapToObj(i -> new Result(1, 2, 3))
    .collect(new ResultCollector<>());
```

With our custom collector we can reduce millions of results into a single combined result: `Result{a:1000000,b:2000000,c:3000000}`.

---

### Why not using reduce instead?

```java
IntStream.range(0, 1_000_000)
    .mapToObj(i -> new Result(1, 2, 3))
    .reduce(Result::combine);
```

Performing 10 times the same process using reduce:

```
Fastest was done in 14ms.
```

Performing 10 times the same process using custom collector:

```
Fastest was done in 7ms.
```

Answer: performance.
