---
layout: default
title: Blog about software
permalink: /posts/
---

{% assign years = site.posts
| group_by_exp: "post", "post.date | date: '%Y'"
%}

<div class="mb-12 mt-0 md:mb-24 md:mt-16 px-4">
  <h1 class="font-normal font-serif my-8 text-center text-8xl text-proseLinks tracking-tighter dark:text-proseInvertLinks">
      Writing
  </h1>
  <div class="container max-w-[625px] mx-auto
          prose prose-lg dark:prose-invert
          prose-a:border-b-[1px] prose-a:border-rosePine-highlightHigh prose-a:font-sans prose-a:no-underline
          hover:prose-a:border-slate-200
          prose-p:text-center prose-p:italic
          ">
    <p>
        All the posts I've written. Mostly short, but sometimes long. I write about topics I find interesting, and I hope you do too.
    </p>
  </div>
</div>

<div class="container max-w-[750px] mx-auto mt-8 px-8">
  <div class="md:flex">
      <div> <!-- needed for sticky -->
          <div class="font-mono my-1 leading-normal text-sm text-proseLinks tracking-tighter dark:text-proseInvertLinks md:sticky md:text-right md:top-5">
              <div class="hidden md:block md:pr-6">
                  <ul>
                  {% for year in years %}
                      <li class="pb-1">
                          <a href="#{{ year.name }}">{{ year.name }}</a>
                      </li>
                  {% endfor %}
                  </ul>
              </div>
          </div>
      </div>
      <div class="pb-8 dark:border-rosePine-highlightMed md:border-l-[1px] md:flex-grow md:min-w-0 md:pl-6">
          {% for year in years %}
              <h2 id="{{ year.name }}" class="font-bold text-sm text-proseLinks tracking-tighter dark:text-proseInvertLinks">{{ year.name }}</h2>
              <ul class="mb-8">
                  {% for post in year.items %}
                      <li class="my-1.5 text-md">
                          <a href="{{ post.url }}" class="border-b-[1px] border-b-slate-200 text-proseLinks dark:border-b-rosePine-highlightMed dark:text-proseInvertLinks hover:border-b-black dark:hover:border-b-proseInvertLinks">{{ post.title }}</a>
                          <span class="italic text-rosePineDawn-subtle dark:text-rosePine-subtle text-[0.65rem]">{{ post.date | date:"%B %d, %Y" }}</span>
                      </li>
                  {% endfor %}
              </ul>
          {% endfor %}
      </div>
  </div>
</div>