---
layout: post
title: "Joining online book clubs"
description: "My journey beyond solo reading through technical book clubs: discovering new topics, building systems, and learning alongside curious engineers."
date: 2025-03-19
---

## Finding my communities

As part of my plan to "revive" my online presence, I joined several online communities. I started with Phill Eaton's [Software Internals](https://eatonphil.com/bookclub.html), which led to Alex Petrov's [Database Internals](https://www.databass.dev/), and finally, Justin Jaffray's [NULL BITMAP](https://buttondown.com/jaffray/archive/chapters-1-2-of-feedback-control/).

My journey into these online communities started with a specific goal: to deepen my understanding of distributed systems and databases. These spaces offer unique advantages: access to hundreds of experienced engineers, exposure to relevant computer science papers, and, most importantly, the opportunity for insightful technical discussions.

## How these book clubs work

In these online communities, there are [book clubs](https://en.wikipedia.org/wiki/Book_discussion_club), which is the topic of this post. Joining these book clubs will encourage you to read books you hadn’t planned to read, books you were already intending to read, or books you’ve read before. Now, you have the opportunity to read these books and discuss them with others.

We dive into two chapters each week in the *Software Internals* and *Database Internals* book clubs. For *Software Internals*, every Saturday, one of us starts the conversation through email in the Google Group, and everyone can share their thoughts afterward. In *Database Internals*, as we read the chapters, you can add your questions, insights, or interesting passages to a shared Google document so we can chat about them during the Wednesday meeting. I'm currently working my way through *NULL BITMAP*, but it functions like a newsletter.

## Current reading list

At the time of this post, I'm reading three books: 

- [Writing for Developers](https://www.goodreads.com/book/show/219199634-writing-for-developers)
- [Database Design and Implementation](https://www.goodreads.com/book/show/50660727-database-design-and-implementation)
- [Feedback Control for Computer Systems](https://www.goodreads.com/book/show/17239249-feedback-control-for-computer-systems)

Before joining, the only book I planned to read was the first one, *Writing for Developers*. I joined the *Software Internals Book Club* to learn about software internals, but at that time, this was the chosen book, and I'm glad it was, as it made my experience of contributing to discussions about a topic I have _some_ context in a bit easier. The book itself deserves a review post, with my takeaways mainly focused on _why you should write_.

The second book, *Database Design and Implementation*, has been a great experience so far. It examines database internals and is accompanied by a sample database called [SimpleDB](https://cs.bc.edu/~sciore/simpledb/). The author made his own design choices and suggests that you modify the source code to implement other design choices that might (or not) improve overall database design and performance. As part of this book, many people, including me, are taking the opportunity to build this database from scratch using a programming language other than Java; Zig and Rust are the most popular options - [I'm using Rust](https://github.com/ordepdev/simpledb-rs). So far, I have covered blocks, pages, buffers, log records, transactions, lock tables, and rollbacks.

The last one, *Feedback Control for Computer Systems*, was a complete surprise. If I recall correctly, Phill shared this other online community that was about to start reading a somewhat technical book instead of *Writing for Developers*, and it clicked right away. I'm on chapter 3, and I've already learned why feedback control is useful for tracking a reference value, even in the face of randomness or a lack of deeper knowledge about the inner workings of a system we need to control by applying automatic correction to deviations from that same reference. I look forward to reading more about this and trying to apply what I learn.

## Managing multiple book clubs

Managing multiple book clubs simultaneously requires some strategy. Having different schedules helps—*Software Internals* on Saturdays, *Database Internals* on Wednesdays—and provides natural spacing between commitments. The key is to be realistic about your time commitment. While it's tempting to join every interesting book club you find, I recommend starting with one, establishing a routine, and gradually adding more if your schedule permits. I also keep separate notes for each book and maintain a calendar with reading deadlines to stay organized.

## Getting started

My experience with these three books—each discovered through different book clubs—has reinforced the value of community-driven learning. What started as a simple desire to revive my online presence has evolved into a rich learning journey spanning technical writing, database internals, and control systems. These book clubs have kept me accountable to my reading goals and exposed me to perspectives and topics I wouldn't have discovered on my own.

If you're considering joining a technical book club, start with one that aligns with your current interests. You can find these communities on platforms like Discord or through technical blogs. Don't be surprised if you are drawn to unexpected topics that expand your technical horizons, like me.

Have you participated in any technical book clubs? What has been your experience with community-based learning? I'd love to hear your thoughts.
