---
title: Vue.js
layout: page
---


A [Vue.js](https://vuejs.org/) wrapper is located at [vue-lineup](https://github.com/lineupjs/vue-lineup). 


Installation
------------


```bash
npm install --save vue-lineup@next
```

**Minimal Usage Example**

```ts
const cats = ['c1', 'c2', 'c3'];
const data = [];
for (let i = 0; i < 100; ++i) {
  data.push({
    a: Math.random() * 10,
    d: 'Row ' + i,
    cat: cats[Math.floor(Math.random() * 3)],
    cat2: cats[Math.floor(Math.random() * 3)],
  });
}

// enable plugin to register components
Vue.use(VueLineUp);

const app = new Vue({
  el: '#app',
  template: `<LineUp v-bind:data="data" />`,
  data: {
    cats,
    data
  }
});
```

[CodePen](https://codepen.io/sgratzl/pen/pKGmvK)

![Minimal Result](https://user-images.githubusercontent.com/4129778/34654173-32180ff8-f3f8-11e7-8469-229fa34a65dc.png)


**Advanced Usage Example**

```ts
const app = new Vue({
  el: '#app',
  template: `<LineUp v-bind:data="data" defaultRanking="true" style="height: 800px">
    <LineUpStringColumnDesc column="d" label="Label" v-bind:width="100" />
    <LineUpCategoricalColumnDesc column="cat" v-bind:categories="cats" color="green" />
    <LineUpCategoricalColumnDesc column="cat2" v-bind:categories="cats" color="blue" />
    <LineUpNumberColumnDesc column="a" v-bind:domain="[0, 10]" color="blue" />
    <LineUpRanking groupBy="cat" sortBy="a:desc">
      <LineUpSupportColumn type="*" />
      <LineUpColumn column="*" />
    </LineUpRanking>
  </LineUp>`,
  data: {
    cats,
    data
  }
});
```

[CodePen](https://codepen.io/sgratzl/pen/vrboWB)

![Advanced Result](https://user-images.githubusercontent.com/4129778/34654174-3235f784-f3f8-11e7-9361-44f5fa068bb9.png)
