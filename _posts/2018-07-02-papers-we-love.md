---
layout: post
title: "Half a year of Papers We Love @ Porto"
date: 2018-07-02
categories: [papers, tech, events]
---

## How it all started

Back to September 2017. Porto's tech scene was booming, still, it was lacking
tech events backed by theoretical computer science. 

At that time, I was
following [@papers_we_love](https://twitter.com/papers_we_love) and started slowly
moving from reading toxic blog posts and threads on
[/r/programming](https://www.reddit.com/r/programming/) to read computer science
papers and watching [PWL talks on Youtube](https://www.youtube.com/user/PapersWeLove).
It was hard to start, papers are hard to read and digest. But after a while, I was
able to read papers, extract some cool content, and explain it to others.

After an amazing edition of [Pixels Camp](https://pixels.camp), I was waiting for
a connection flight from Lisbon to Porto and started talking about Papers We Love.
I was looking at the list of chapters and thought out loud: "We should start
something like this in Porto".

After a few months, Papers We Love @ Porto was a real thing... :)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Hello <a href="https://twitter.com/hashtag/Porto?src=hash&amp;ref_src=twsrc%5Etfw">#Porto</a>! We are the latest chapter of <a href="https://twitter.com/papers_we_love?ref_src=twsrc%5Etfw">@papers_we_love</a>. We&#39;re interested in reading and sharing ideas from computer science papers. Joins us!</p>&mdash; Papers We Love @ Porto (@pwlporto) <a href="https://twitter.com/pwlporto/status/953775150540890113?ref_src=twsrc%5Etfw">January 17, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

During the past six months, I was able to meet very kind and interesting
people. The first one was [Carlos Baquero](https://twitter.com/@xmal), a
Distributed Systems Professor from Minho University and Co-creator of CRDTs.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Good move! I and others had been entertaining the idea of doing a PWL Braga/Porto, but maybe now it’s better just to join efforts. We should get in touch.</p>&mdash; Carlos Baquero (@xmal) <a href="https://twitter.com/xmal/status/953920048678277120?ref_src=twsrc%5Etfw">January 18, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Carlos introduced me to [Alvaro Videla](https://twitter.com/old_sound) and
after a few emails, we managed to schedule the very first session of [@pwlporto](https://twitter.com/@pwlporto). We had dinner on the night before and talked about the gap
between industry and academia and how this group could help with that. It was really
nice to meet and chat with Carlos and Alvaro!

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Great news! Alvaro Videla (<a href="https://twitter.com/old_sound?ref_src=twsrc%5Etfw">@old_sound</a>) will be presenting  Harmful GOTOs, Premature Optimizations and Programming Myths are The Root of All Evil on February 22nd at the very first <a href="https://twitter.com/papers_we_love?ref_src=twsrc%5Etfw">@papers_we_love</a> <a href="https://twitter.com/hashtag/Porto?src=hash&amp;ref_src=twsrc%5Etfw">#Porto</a> - we&#39;re excited, you should be too!<br><br>RSVP: <a href="https://t.co/IsqTLNRJUI">https://t.co/IsqTLNRJUI</a></p>&mdash; Papers We Love @ Porto (@pwlporto) <a href="https://twitter.com/pwlporto/status/964938414528266240?ref_src=twsrc%5Etfw">February 17, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Alvaro introduced some of the myths in our industry with the objective of promoting a culture of reading more books, academic papers and related material
that refers to the history of our field and programming in general. It was the
best start that we could have, thanks to [Alvaro Videla](https://twitter.com/old_sound) and [Carlos Baquero](https://twitter.com/@xmal)!

We had 15 attendees at the very first edition of Papers We Love. I remember that we
were making bets on how many people would attend. Only one person sharing and
spreading the word, 99% of tech people were only interested in hot topics, papers what?
Numbers ranged from 5 to 15. I was the optimist, and we had very nice folks attending!

## Why do we need this kind of events in the tech community?

Nowadays, developers only care about trends: languages, frameworks, databases,
and methodologies. That's the sad thing about the current state of our tech
industry. We need to promote developers to read good literature, instead of
random blog posts that eventually will lead to another internet flame war.

My goal for this chapter of Papers We Love is to have more and more people
reading computer science books/papers and giving talks about it. You don't
really need to be an expert to give a talk. If you like a specific computer
science topic or even a small algorithm, step up and give a talk!

## Topics presented so far...

Five sessions and seven talks, that’s our record so far! I truly want to
express my gratitude to these folks for stepping up and sharing their
knowledge. This wouldn’t be possible without them!

> All Aboard the Natural Language Processing Train

From the depts of intuition to practice, [José Marcelino](https://www.linkedin.com/in/josemarcelino1) guided us through the valley
of Natural Language Processing field. Sequence labeling tasks, such as
Part-of-Speech Tagging or Named Entity Recognition, represents a crucial
step to understand language.

> Performance testing of open-source HTTP web frameworks

[Michael Domingues](https://www.linkedin.com/in/michaelapdomingues) presented
his study on performance testing against three web frameworks written in Go.
The results have shown that Gin contributed to the fastest response times for a set
of requests that vary on processing and retrieved data complexity.

> Causality is simple

[Carlos Baquero](https://twitter.com/@xmal) brought back the intuition on
causality and showed that keeping in mind some simple concepts, allows
us to understand how version vectors and vector clocks work, and where they
differ, and how to use more sophisticated mechanisms to handle millions of
concurrent clients in modern distributed data stores.

> Things you should know about Database Storage and Retrieval

It was a hard month. Everyone I've invited was busy, so I had to step up
and give a talk :) We discussed and examined some core data structures such as Hash Indexes, SSTables, LSM-Trees, and B-Trees, that are used in the traditional relational databases and NoSQL databases.

> Knee Deep Into P2P

[Fernando Mendes](https://twitter.com/fribmendes) introduced some simple P2P
topologies such as gossip and trees. Then he moved to more complex ones
such as Gnutella2, HyParView, and Plumtrees and analyzed their problems and
took a look at what CRDTs are and how awesome they can be for shared data.

> Ethereum: A secure decentralised generalised transaction ledger

[Hugo Peixoto](https://www.linkedin.com/in/hugopeixoto) presented the
Ethereum original paper, by introducing the core concepts of blockchain
and how it relates to Bitcoin.

> Visualising graphs with millions of edges using edge bundling

[Daniel Moura](https://www.linkedin.com/in/dmoura) explained us the
rationale of graph bundling based on kernel density estimation, proposed
simplifications that make the algorithm more efficient and easier to
implement, and showed how the base algorithm can be extended to handle
different clustering criteria and to produce videos of evolving graphs.

## A very big thanks to these companies!

People like hot topics. Companies too. So far, our meetups were hosted
by Farfetch, XING, Subvisual, and Veniam. Kudos to them! I’m running this
meetup without any sort of sponsor and it’s great to have support from local
companies to help this group to grow!

## Looking forward...

As I'm writing this post, we are 171 members on
[meetup.com](https://www.meetup.com/Papers-We-Love-Porto) spread between
Porto and Braga! I really want to keep these two cities as close as possible.

We're growing, slowly, but growing!
