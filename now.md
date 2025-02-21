---
layout: now
title: What I'm doing now
permalink: /now/
published: false
---

{% for post in site.now limit:1 %}
<div class="my-16
            ml-[calc(-1rem)] mr-[calc(-1rem)] w-[calc(100%+2rem)]
            lg:mr-[calc(-1rem-75px)] lg:ml-[calc(-1rem-75px)] lg:w-[calc(100%+2rem+2*75px)]
            xl:mr-[calc(-1rem-150px)] xl:ml-[calc(-1rem-150px)] xl:w-[calc(100%+2rem+2*150px)]
            ">
</div>

{{ post.content }}

<div class="mb-16 not-prose">
    <p class="font-serif italic my-1 leading-normal not-prose text-sm tracking-tight">This page was last updated on
        <span class="font-bold">Dec 19, 2024</span>.
    </p>
</div>
{% endfor %}

{% for post in site.posts offset:1 %}
<details>
<summary class="font-semibold font-serif italic list-outside pl-1 text-sm">{{ post.date | date:"%B %d, %Y" }}</summary>
  {{ post.content }}
</details>
<p></p>
{% endfor %}
