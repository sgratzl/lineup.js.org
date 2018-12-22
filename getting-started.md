---
title: Getting Started
menu: bar
layout: page
---

Installation
------------


```bash
npm install --save lineupjs
```

```html
<link href="https://unpkg.com/lineupjs/build/LineUpJS.css" rel="stylesheet">
<script src="https://unpkg.com/lineupjs/build/LineUpJS.js"></script>
```

Minimal Usage Example
---------------------

```javascript
// generate some data
const arr = [];
const cats = ['c1', 'c2', 'c3'];
for (let i = 0; i < 100; ++i) {
  arr.push({
    a: Math.random() * 10,
    d: 'Row ' + i,
    cat: cats[Math.floor(Math.random() * 3)],
    cat2: cats[Math.floor(Math.random() * 3)]
  })
}
```
```javascript
const lineup = LineUpJS.asLineUp(document.body, arr);
```

[CodePen](https://codepen.io/sgratzl/pen/Ozzbqp)

[![Minimal Result](https://user-images.githubusercontent.com/4129778/34654173-32180ff8-f3f8-11e7-8469-229fa34a65dc.png)](https://codepen.io/sgratzl/pen/Ozzbqp)

<p data-height="800" data-theme-id="light" data-slug-hash="Ozzbqp" data-default-tab="result" data-user="sgratzl" data-pen-title="lineupjs simple example" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/sgratzl/pen/Ozzbqp/">lineupjs simple example</a> by Samuel Gratzl (<a href="https://codepen.io/sgratzl">@sgratzl</a>) on <a href="https://codepen.io">CodePen</a>.</p>



Advanced Usage Example
----------------------

```javascript
// arr from before
const builder = LineUpJS.builder(arr);

// manually define columns
builder
  .column(LineUpJS.buildStringColumn('d').label('Label').width(100))
  .column(LineUpJS.buildCategoricalColumn('cat', cats).color('green'))
  .column(LineUpJS.buildCategoricalColumn('cat2', cats).color('blue'))
  .column(LineUpJS.buildNumberColumn('a', [0, 10]).color('blue'));

// and two rankings
const ranking = LineUpJS.buildRanking()
  .supportTypes()
  .allColumns() // add all columns
  .impose('a+cat', 'a', 'cat2'); // create composite column
  .groupBy('cat')
  .sortBy('a', 'desc')
  

builder
  .defaultRanking()
  .ranking(ranking);

const lineup = builder.build(document.body);
```

[CodePen](https://codepen.io/sgratzl/pen/vppyML)

[![Advanced Result](https://user-images.githubusercontent.com/4129778/34654174-3235f784-f3f8-11e7-9361-44f5fa068bb9.png)](https://codepen.io/sgratzl/pen/vppyML)

<p data-height="800" data-theme-id="light" data-slug-hash="vppyML" data-default-tab="result" data-user="sgratzl" data-pen-title="lineupjs advanced example" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/sgratzl/pen/vppyML/">lineupjs advanced example</a> by Samuel Gratzl (<a href="https://codepen.io/sgratzl">@sgratzl</a>) on <a href="https://codepen.io">CodePen</a>.</p>
