---
layout: post
title: "Order-of-growth classifications"
date: 2016-05-19
categories: [ programming, java ]
---

**Constant**: A program whose running time's order of growth is constant executes a fixed number of operations and its
running time does not depend on *N*.

**Logarithmic**: A program whose running time's order of growth is *logarithmic* is barely slower than *constant*. The
base of the logarithm is not relevant with respect to the order of growth, so its order of growth is *log N*.

**Linear**: Programs that spend a constant amount of time processing each piece of input data, or that are based on a
single *for* loop. Its running time is proportional to *N*.

**Linearithmic**: Programs whose running time for a problem of size *N* has order of growth *N log N*.

**Quadratic**: Programs whose running time has order of growth *N^2* has two nested *for* loops, used for some
calculation involving all pairs of *N* elements.

**Cubic**: Programs whose running time has order of growth *N^3* has three nested *for* loops, used for some calculation
involving all triples of *N* elements.

**Exponencial**: Exponencial algorithms are extremely slow and its order of growth is b^N for any constant *b > 1*.

|              | order of growth | description        | example           |
|--------------|-----------------|--------------------|-------------------|
| constant     | 1               | statement          | add two numbers   |
| logarithmic  | *log N*         | divide in half     | binary search     |
| linear       | *N*             | loop               | find the maximum  |
| linearithmic | *N log N*       | divide and conquer | mergesort         |
| quadratic    | *N^2*           | double loop        | check all pairs   |
| cubic        | *N^3*           | triple loop        | check all triples |
| exponential  | *2^N*           | exhaustive search  | check all subsets |

*Note*: this is not a complete set, it only contains the most common classfications.
