---
layout: post
title:  "Size of an Object in Java"
date:   2016-05-19
---

One of Java's most significant features is its memory allocation system, which is supposed to relieve us from having to worry about memory. We are well-advised to take advantage of this feature, still, it is our responsibility to know, at least approximately, the size of an Object and if the memory requirements will prevent us from solving a given problem.

|type|bytes|
|---|---|
|boolean|1|
|byte|1|
|char|2|
|int|4|
|float|4|
|long|8|
|double|8|

**Objects**: the overhead associated with each object is typically 16 bytes. This includes a reference to the object's class, garbage collection information, and synchronization information. The memory usage is padded to be a multiple of 8 bytes. Take for instance an int, with 4 bytes, the padding is also 4 bytes.

**Integer**: an Integer object uses 24 bytes, 16 bytes of overhead, 4 bytes for its int instance variable and 4 bytes of padding.

**Date**: a Date object uses 32 bytes, 16 bytes of overhead, 4 bytes for each of its three int instance variables, and 4 bytes of padding.

**Linked lists**: a Linked lists object uses 32 + 64N bytes, 16 bytes of overhead, 8 for its reference instance variable, 4 for its int instance variable, 4 for padding, and 64 for each entry, 40 for a Node and 24 for an Integer.

**Arrays**: an Array tipically requires 24 bytes of header information, 16 bytes of overhead, 4 bytes for the length, and 4 bytes of padding, plus the memory needed to store the values.

|type|bytes|
|---|---|
|int[]|~4N|
|double[]|~8N|
|Date[]|~40N|
|double[][]|~8NM|

**Strings**: each String uses a total of 40 bytes, 16 for overhead, 4 bytes for each of the three int instances variables (offset, count and hash code), 8 bytes for the character array reference, and 4 bytes of padding.

**Important note**. Creating arrays or other large objects in recursive programs is **dangerous**, since each recursive call implies significant memory usage. When we create an object with *new*, the system allocates the memory needed for the object from another special area of memory known as the *heap*, and we must remember that **every object lives until no references to it remain**.

