---
title: ObservableHQ
layout: page
---

A [ObservableHQ](https://observablehq.com/) wrapper is located at [lineu-js-observable](https://observablehq.com/@sgratzl/lineup-js-observable-library). 


Minimal Usage Example
---------------------

```javascript
// generate some data
data = {
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
  return arr;
}
```
```js
import { asLineUp } from '@sgratzl/lineup-js-observable-library'
```
```js
viewof selection = asLineUp(data)
```

[ObservableHQ](https://observablehq.com/@sgratzl/lineup-simple-example-with-observable-base)

[![Minimal Result](https://user-images.githubusercontent.com/4129778/75078130-cd276d80-54d2-11ea-9496-0cc685e826ee.png)](https://observablehq.com/@sgratzl/lineup-simple-example-with-observable-base)


Advanced Usage Example
----------------------

```js
// arr from before
viewof selection = {
  const b = builder(data);
  b.column(
    LineUpJS.buildStringColumn('d')
      .label('Label')
      .width(100)
  )
    .column(LineUpJS.buildCategoricalColumn('cat', cats).color('green'))
    .column(LineUpJS.buildCategoricalColumn('cat2', cats).color('blue'))
    .column(LineUpJS.buildNumberColumn('a', [0, 10]).color('blue'));

  // and two rankings
  const ranking = LineUpJS.buildRanking()
    .supportTypes()
    .allColumns() // add all columns
    .impose('a+cat', 'a', 'cat2') // create composite column
    .groupBy('cat')
    .sortBy('a', 'desc');

  b.defaultRanking().ranking(ranking);
  return b.build();
}
```

[ObservableHQ](https://observablehq.com/@sgratzl/lineup-advanced-example)

[![Advanced Result](https://user-images.githubusercontent.com/4129778/75078499-bfbeb300-54d3-11ea-92aa-b9ab0d2af043.png)](https://observablehq.com/@sgratzl/lineup-advanced-example)
