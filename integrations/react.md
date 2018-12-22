---
title: React
layout: page
---


A [React](https://reactjs.org/) wrapper is located at [lineupjsx](https://github.com/lineupjs/lineupjsx). 


Installation
------------

```bash
npm install --save lineupjsx@next
```

```html
<link href="https://unpkg.com/lineupjsx@next/build/LineUpJSx.css" rel="stylesheet">
<script src="https://unpkg.com/lineupjsx@next/build/LineUpJSx.js"></script>
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
```jsx
<LineUp data={arr}/>
```

[CodePen](https://codepen.io/sgratzl/pen/mXEpMP)

[![Minimal Result](https://user-images.githubusercontent.com/4129778/34654173-32180ff8-f3f8-11e7-8469-229fa34a65dc.png)](https://codepen.io/sgratzl/pen/Ozzbqp)

<p data-height="800" data-theme-id="light" data-slug-hash="Ozzbqp" data-default-tab="result" data-user="sgratzl" data-pen-title="lineupjs simple example" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/sgratzl/pen/Ozzbqp/">lineupjs simple example</a> by Samuel Gratzl (<a href="https://codepen.io/sgratzl">@sgratzl</a>) on <a href="https://codepen.io">CodePen</a>.</p>


Advanced Usage Example
----------------------

```jsx
// arr from before
<LineUp data={arr} defaultRanking>
  <LineUpStringColumnDesc column="d" label="Label" width={100} />
  <LineUpCategoricalColumnDesc column="cat" categories={cats} color="green" />
  <LineUpCategoricalColumnDesc column="cat2" categories={cats} color="blue" />
  <LineUpNumberColumnDesc column="a" domain={[0, 10]} color="blue" />

  <LineUpRanking groupBy="cat" sortBy="a:desc">
    <LineUpSupportColumn type="*" />
    <LineUpColumn column="*" />
    <LineUpImposeColumn label="a+cat" column="a" categeoricalColumn="cat2" />
  </LineUpRanking>
</LineUp>;
```

[CodePen](https://codepen.io/sgratzl/pen/yvJpWQ)

[![Advanced Result](https://user-images.githubusercontent.com/4129778/34654174-3235f784-f3f8-11e7-9361-44f5fa068bb9.png)](https://codepen.io/sgratzl/pen/vppyML)

<p data-height="800" data-theme-id="light" data-slug-hash="vppyML" data-default-tab="result" data-user="sgratzl" data-pen-title="lineupjs advanced example" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/sgratzl/pen/vppyML/">lineupjs advanced example</a> by Samuel Gratzl (<a href="https://codepen.io/sgratzl">@sgratzl</a>) on <a href="https://codepen.io">CodePen</a>.</p>
