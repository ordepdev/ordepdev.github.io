---
layout: default
title: Blog about software
---

<main id="content" class="content" role="main">
    <ul class="list-posts">
        {% for post in site.posts %}
            <li>
                <span>{{ post.date | date:"%B %d, %Y" }}</span>
                <a href="{{ post.url }}">{{ post.title }}</a>
            </li>
        {% endfor %}
    </ul>
</main>