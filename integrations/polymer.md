---
title: Polymer
layout: page
---


A [Polymer 2.0](https://www.polymer-project.org/) web component wrapper is located at [lineup-element](https://github.com/lineupjs/lineup-element). 

Installation
------------

```bash
bower install https://github.com/lineupjs/lineup-element
```

```html
<link rel="import" href="bower_components/lineup-element/lineup-element.html">
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
conat data = { arr, cats };
```
```jsx
<lineup-element data="[[data.arr]]"></lineup-element>
```

TODO
[CodePen]()

[![Minimal Result](https://user-images.githubusercontent.com/4129778/34654173-32180ff8-f3f8-11e7-8469-229fa34a65dc.png)](https://codepen.io/sgratzl/pen/Ozzbqp)

Advanced Usage Example
----------------------

```jsx
// arr from before
<lineup-element data="[[data.arr]]" side-panel side-panel-collapsed default-ranking="true">
  <lineup-string-desc column="d" label="Label" width="100" ></lineup-string-desc>
  <lineup-categorical-desc column="cat" categories="[[cats]]" color="green" ></lineup-categorical-desc>
  <lineup-categorical-desc column="cat2" categories="[[cats]]" color="blue" ></lineup-categorical-desc>
  <lineup-number-desc column="a" domain="[0, 10]" color="blue" ></lineup-number-desc>
  <lineup-ranking group-by="cat" sort-by="a:desc">
    <lineup-support-column type="*" ></lineup-support-column>
    <lineup-column column="*" ></lineup-column>
  </lineup-ranking>
</lineup-element>
```

TODO
[CodePen]()

[![Advanced Result](https://user-images.githubusercontent.com/4129778/34654174-3235f784-f3f8-11e7-9361-44f5fa068bb9.png)](https://codepen.io/sgratzl/pen/vppyML)

