---
layout: post
title: "First publish to NPM"
date: 2014-11-19
categories: [ programming, javascript ]
---

I love open source. I really do. I use tons of stuff published in Github but until now I haven't done anything useful to
others.
Finally, I've had a simple idea of scrapping football results and serve them as a JSON. Yes, I'm a nerd guy who loves
football (GO BENFICA!).

I open the [livescore] website multiple times a day but if the results where right inside of my terminal? This tiny
workarounds save plenty of time during the day, specially if you're a programmer.

To get this running just install and include `scores-parser` in your JavaScript file.

```bash
$ npm install scores-parser
```

```js
var scores = require('scores-parser')
```

In order to retrieve the results call the main function with or without parameters and callback.

```js
scores({date: 'YYYY-MM-DD'}, function (data) {
    // handle results 
})
```

When I search for NPM packages they must be very clear and doesn't try to do many things. So I split my idea in two
separated packages. One to parse the results and serve them as JSON. The other consumes that JSON and transforms into a
formatted table.

The other package is `scores-table`. You can install and use it like this.

```bash
$ npm install -g scores-table
$ scores-table -l
```

![scores](/assets/images/livescores.png)

These are my first NPM packages and already have 568 downloads.

#### Usefull Links

[scores-parser][scores-parser] ~ [scores-table][scores-table]

[livescore]: http://www.livescores.com

[scores-parser]: https://github.com/ordepdev/scores-parser

[scores-table]: https://github.com/ordepdev/scores-table