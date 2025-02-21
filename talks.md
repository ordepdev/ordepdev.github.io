---
layout: default
title: Talks
permalink: /talks/
---

{% assign talks = site.data.talks
| group_by_exp: "talk", "talk.year"
%}

<div class="mb-12 mt-0 md:mb-24 md:mt-16 px-4">
    <h1 class="font-normal font-serif my-8 text-center text-8xl text-proseLinks tracking-tighter dark:text-proseInvertLinks">
        Talks
    </h1>
    <div class="container max-w-[625px] mx-auto
            prose prose-lg dark:prose-invert
            prose-a:border-b-[1px] prose-a:border-slate-500 prose-a:font-sans prose-a:no-underline
            hover:prose-a:border-slate-200
            prose-p:text-center prose-p:italic
            ">
        <p>
            I have been speaking at conferences, meetups, and other events since 2017. I really enjoyed the experience and need to try to get back to it again.
        </p>
    </div>
</div>

<div class="container max-w-[1150px] mx-auto mt-8 px-8">
    <div class="md:flex">
        <div> <!-- needed for sticky -->
            <div class="font-mono my-1 leading-normal text-md text-proseLinks tracking-tighter dark:text-proseInvertLinks md:sticky md:text-right md:top-5">
                <div class="hidden md:block md:pr-6">
                    <ul>
                        {% for year in talks %}
                            <li class="pb-1">
                                <a href="#{{ year.name }}">{{ year.name }}</a>
                            </li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
        </div>
        <div class="pb-8 dark:border-rosePine-highlightMed md:border-l-[1px] md:flex-grow md:min-w-0">
            {% for year in talks %}
                <div class="border-b-[1px] py-6 dark:border-rosePine-highlightMed md:pl-6" id="{{ year.name }}">
                    <h2 class="font-bold text-md text-proseLinks tracking-tighter dark:text-proseInvertLinks">{{ year.name }}</h2>
                </div>
                <ul>
                    {% for talk in year.items %}
                        <div class="border-b-[1px] flex flex-col dark:border-rosePine-highlightMed md:pl-6">
                            <div class="flex gap-6 py-6">
                                <div class="flex-grow lg:basis-[250px] lg:flex-grow-0 lg:flex-shrink-0 {{end}}">
                                    <div class="flex flex-col gap-1">
                                        <div class="font-semibold text-proseLinks text-sm dark:text-proseInvertLinks">{{ talk.title }}</div>
{% for location in talk.where %} 
                                        <div class="italic text-xs text-proseLinks text-sm dark:text-proseInvertLinks">
                                          <span>{{ location }}</span>
                                        </div>
{% endfor %}
                                    </div>
                                </div>
                                <div class="basis-[40px] flex-grow-0 flex-shrink-0 hidden text-proseBody text-xs dark:text-proseInvertBody sm:block">
                                    <a href="{{ talk.slides }}" class="border-b-[1px] border-b-slate-200 text-proseLinks dark:border-b-rosePine-highlightMed dark:text-proseInvertLinks hover:border-b-black dark:hover:border-b-proseInvertLinks">Slides</a>
                                </div>
                                <div class="basis-[80px] flex-grow-0 flex-shrink-0 text-proseBody text-xs dark:text-proseInvertBody">
                                    {% for recording in talk.recordings %}
                                   <a href="{{ recording }}" class="border-b-[1px] border-b-slate-200 text-proseLinks dark:border-b-rosePine-highlightMed dark:text-proseInvertLinks hover:border-b-black dark:hover:border-b-proseInvertLinks">
                                     Recording
              </a>
                                    {% endfor %}
                                </div>
                                <div class="basis-[40px] flex-grow-0 flex-shrink-0 hidden text-proseBody text-xs dark:text-proseInvertBody sm:block">
                                    <span>{{ book.read_at | date:"%b %d" }}</span>
                                </div>
                                <div class="hidden
                                            hyphens-auto
                                            mt-[-3px]
                                            italic
                                            prose dark:prose-invert
                                            prose-p:font-serif prose-p:leading-5 prose-p:text-sm
                                            lg:block
                                            ">
                                    <p>{{ talk.abstract }}</p> 
                                </div>
                            </div>
                            {% if talk.abstract %}
                                <div class="hyphens-auto
                                            max-w-none
                                            pb-6
                                            prose dark:prose-invert
                                            prose-p:font-serif prose-p:leading-5 prose-p:text-sm
                                            lg:hidden
                                            ">
                                    <p>{{ talk.abstract }}</p> 
                                </div>
                            {% endif %}
                        </div>
                    {% endfor %}
                </ul>
            {% endfor %}
        </div>
    </div>
</div>
