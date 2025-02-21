---
layout: default
title: Home
---

{% assign years = site.posts
| group_by_exp: "post", "post.date | date: '%Y'"
%}

<div class="border-b px-12 py-20 dark:border-b-rosePine-highlightMed ">
    <div class="mx-auto
        prose prose-lg dark:prose-invert
        prose-a:border-b prose-a:border-proseLinks dark:prose-a:border-proseInvertLinks prose-a:font-bold prose-a:font-sans prose-a:no-underline
        ">
        <p class="font-semibold leading-snug max-w-[725px] mx-auto
                  prose-a:border-b-4 prose-a:border-proseLinks dark:prose-a:border-proseInvertLinks
                  text-left text-[2.5rem]
                  tracking-tight
                  ">
            👋🏼 I'm <a href="https://twitter.com/ordepdev" rel="me">@ordepdev</a>.
        </p>
        <p class="font-semibold leading-snug max-w-[725px] mx-auto
                  prose-a:border-b-4 prose-a:border-proseLinks dark:prose-a:border-proseInvertLinks
                  text-left text-[2.5rem]
                  tracking-tight
                  ">
            I like distributed systems, databases, and programming languages.
        </p>
        <p class="font-medium leading-relaxed max-w-[725px] mx-auto text-[1rem] prose-a:border-proseLinks dark:prose-a:border-proseInvertLinks">
This website is where I share my <a href="/posts">articles</a>, <a href="/posts">thoughts</a>, and current <a href="/readings">readings</a>. I'm reviving my online presence. Although I stopped <a href="/posts">writing</a> and giving <a href="/talks">talks</a> in 2021, I plan to write as often as possible from now on.
       </p>
    </div>
</div>

<div class="border-b px-12 py-20 dark:dark:border-b-rosePine-highlightMed md:px-20 lg:px-28">
    <div class="hyphens-auto max-w-none
        prose prose-md dark:prose-invert
        prose-a:border-b prose-a:border-proseLinks dark:prose-a:border-proseInvertLinks prose-a:font-sans prose-a:leading-tight prose-a:no-underline prose-a:text-[0.92rem]
        prose-li:my-[1.2em] prose-li:pl-0.5
        prose-strong:font-sans
        prose-ul:font-serif prose-ul:leading-normal prose-ul:pl-5
        ">
        <div class="flex flex-col gap-4 justify-center md:flex-row md:gap-10 lg:gap-16">
            <div class="flex-1 flex-grow pb-12 md:pb-0 lg:max-w-[21rem]">
                <p class="font-serif mt-0 text-[0.9rem]">Once in a while, I write longer articles that might be worth sharing on Hacker News. Mostly about distributed systems, and engineering challenges.</p>
                <ul class="mb-0">
                    {% assign articles = site.posts | where: "layout", "article" %}
                    {% for post in articles limit:3 %}
                        <li class="last:mb-0">
                            <a href="{{ post.url }}">{{ post.title }}</a>
                            <span class="font-sans italic pl-0.5 text-rosePineDawn-subtle text-[0.7rem] dark:text-rosePine-subtle">{{ post.date | date:"%B %d, %Y" }}</span>
                            <p class="font-sans mt-2 mb-0 text-[0.82rem]">{{ post.description }}</p>
                        </li>
                    {% endfor %}
                </ul>
            </div>
            <div class="flex-1 flex-grow pb-12 md:pb-0 lg:max-w-[21rem]">
                <p class="font-serif mt-0 text-[0.9rem]">You'll find mostly shorter posts that capture specific insights or experiences. Each one focuses on a single idea worth sharing.</p>
                <ul class="mb-0">
                    {% assign fragments = site.posts | where: "layout", "post" %}
                    {% for post in fragments limit:3 %}
                        <li class="last:mb-0">
                            <a href="{{ post.url }}">{{ post.title }}</a>
                            <span class="font-sans italic pl-0.5 text-rosePineDawn-subtle text-[0.7rem] dark:text-rosePine-subtle">{{ post.date | date:"%B %d, %Y" }}</span>
                            <p class="font-sans mt-2 mb-0 text-[0.82rem]">{{ post.description }}</p>
                        </li>
                    {% endfor %}
                </ul>
            </div>
            <div class="flex-1 flex-grow lg:max-w-[21rem]">
                <p class="font-serif mt-0 text-[0.9rem]">In the meantime, I make time to read some <a href="/readings">books</a>. Some tech, some not, mostly non-fiction. No fancy reviews, just honest takes.</p>
                <ul class="mb-0">
                    {% for book in site.data.readings limit:3 %}
                        <li class="last:mb-0">
                            <a href="{{ book.link }}">{{ book.title }}</a>
                            <span class="font-sans italic pl-0.5 text-rosePineDawn-subtle text-[0.7rem] dark:text-rosePine-subtle">{{ book.read_at | date:"%B %d, %Y" }}</span>
      <p class="font-sans mt-2 mb-0 text-[0.82rem]">{{ book.authors }}, {{ book.published_year}}</p>
                                <div class="basis-[80px] flex-grow-0 flex-shrink-0 text-proseBody text-xs dark:text-proseInvertBody">
                            <p class="font-sans mt-2 mb-0">
     {% if book.rating != 0 %}
                                    {% for i in (1..book.rating) %}★&nbsp;{% endfor %}
                                {% endif %} </p>
                                </div>
                        </li>
                    {% endfor %}
                </ul>
            </div>
        </div>
    </div>
</div>
