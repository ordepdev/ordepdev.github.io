---
layout: default
title: Readings
permalink: /readings/
---

{% assign readings = site.data.readings
| group_by_exp: "book", "book.read_at | date: '%Y'"
%}

<div class="mb-12 mt-0 md:mb-24 md:mt-16 px-4">
    <h1 class="font-normal font-serif my-8 text-center text-8xl text-proseLinks tracking-tighter dark:text-proseInvertLinks">
        Reading
    </h1>
    <div class="container max-w-[625px] mx-auto
            prose prose-lg dark:prose-invert
            prose-a:border-b-[1px] prose-a:border-slate-500 prose-a:font-sans prose-a:no-underline
            hover:prose-a:border-slate-200
            prose-p:text-center prose-p:italic
            ">
        <p>
            Books I've read. You'll find mostly non-fiction books here. Computer science, programming, software engineering,
            but also politics, history, economics, and other topics. I'm trying to read more fiction, but it's hard.
        </p>
    </div>
</div>

<div class="container max-w-[1150px] mx-auto mt-8 px-8">
    <div class="md:flex">
        <div> <!-- needed for sticky -->
            <div class="font-mono my-1 leading-normal text-md text-proseLinks tracking-tighter dark:text-proseInvertLinks md:sticky md:text-right md:top-5">
                <div class="hidden md:block md:pr-6">
                    <ul>
                        {% for year in readings %}
                            <li class="pb-1">
                                <a href="#{{ year.name }}">{{ year.name }}</a>
                            </li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
        </div>
        <div class="pb-8 dark:border-rosePine-highlightMed md:border-l-[1px] md:flex-grow md:min-w-0">
            {% for year in readings %}
                <div class="border-b-[1px] py-6 dark:border-rosePine-highlightMed md:pl-6" id="{{ year.name }}">
                    <h2 class="font-bold text-md text-proseLinks tracking-tighter dark:text-proseInvertLinks">{{ year.name }}</h2>
                </div>
                <ul>
                    {% for book in year.items %}
                        <div class="border-b-[1px] flex flex-col dark:border-rosePine-highlightMed md:pl-6">
                            <div class="flex gap-6 py-6">
                                <div class="flex-grow {% if book.review %} lg:basis-[250px] lg:flex-grow-0 lg:flex-shrink-0 {% endif %}">
                                    <div class="flex flex-col gap-1">
                                        <div class="font-semibold text-proseLinks text-sm dark:text-proseInvertLinks">
                                            <a href="{{ book.link }}">{{ book.title }}</a>
                                        </div>
                                        <div class="italic text-proseBody text-xs dark:text-proseInvertBody">{{ book.authors }}</div>
                                    </div>
                                </div>
                                <!-- needs at least 80px to support five star reviews -->
                                <div class="basis-[80px] flex-grow-0 flex-shrink-0 text-proseBody text-xs dark:text-proseInvertBody">
                                {% if book.rating != 0 %}
                                    {% for i in (1..book.rating) %}★&nbsp;{% endfor %}
                                {% endif %}
                                </div>
                                <div class="basis-[40px] flex-grow-0 flex-shrink-0 hidden text-proseBody text-xs dark:text-proseInvertBody sm:block">
                                    {% if book.pages == 0 %}
                                        <span class="text-slate-400">—</span>
                                    {% else %}
                                        {{ book.pages }}p.
                                    {% endif %}
                                </div>
                                <div class="basis-[40px] flex-grow-0 flex-shrink-0 hidden text-proseBody text-xs dark:text-proseInvertBody sm:block">
                                    <span>{{ book.read_at | date:"%b %d" }}</span>
                                </div>
                                {% if book.review %}
                                    <div class="hidden
                                                hyphens-auto
                                                mt-[-3px]
                                                prose dark:prose-invert
                                                prose-p:font-serif prose-p:leading-5 prose-p:text-sm
                                                lg:block
                                                ">
                                        <p>{{ book.review }}</p> 
                                    </div>
                                {% endif %}
                            </div>
                            {% if book.review %}
                                <div class="hyphens-auto
                                            max-w-none
                                            pb-6
                                            prose dark:prose-invert
                                            prose-p:font-serif prose-p:leading-5 prose-p:text-sm
                                            lg:hidden
                                            ">
                                        <p>{{ book.review }}</p> 
                                </div>
                            {% endif %}
                        </div>
                    {% endfor %}
                </ul>
            {% endfor %}
        </div>
    </div>
</div>

