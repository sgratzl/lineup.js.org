---
title: Angular
layout: page
---


A [Angular](https://angular.io/) wrapper is located at [nglineup](https://github.com/lineupjs/nglineup). 


Installation
------------


```bash
npm install --save nglineup
```

**Minimal Usage Example**

`app.module.ts`:
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LineUpModule } from '../lib/lineup.module';

import { AppComponent } from './app.component.1';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LineUpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

`app.component.ts`:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly data = <any[]>[];

  readonly cats = ['c1', 'c2', 'c3'];

  constructor() {
    const cats = this.cats;
    for (let i = 0; i < 100; ++i) {
      this.data.push({
        a: Math.random() * 10,
        d: 'Row ' + i,
        cat: cats[Math.floor(Math.random() * 3)],
        cat2: cats[Math.floor(Math.random() * 3)]
      });
    }
  }
}
```

`app.component.html`:
```html
<lineup-lineup [data]="data"></lineup-lineup>
```


[CodePen](https://codepen.io/sgratzl/pen/QxYgzN)

![Minimal Result](https://user-images.githubusercontent.com/4129778/34654173-32180ff8-f3f8-11e7-8469-229fa34a65dc.png)

<p data-height="800" data-theme-id="light" data-slug-hash="QxYgzN" data-default-tab="result" data-user="sgratzl" data-pen-title="lineupjs simple example" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/sgratzl/pen/QxYgzN/">lineupjs simple example</a> by Samuel Gratzl (<a href="https://codepen.io/sgratzl">@sgratzl</a>) on <a href="https://codepen.io">CodePen</a>.</p>


**Advanced Usage Example**

`app.component.html`:
```html
<lineup-lineup [data]="data" [defaultRanking]="true" style="height: 800px">
  <lineup-string-column-desc column="d" label="Label" [width]="100"></lineup-string-column-desc>
  <lineup-categorical-column-desc column="cat" [categories]="cats" color="green"></lineup-categorical-column-desc>
  <lineup-categorical-column-desc column="cat2" [categories]="cats" color="blue"></lineup-categorical-column-desc>
  <lineup-number-column-desc column="a" [domain]="[0, 10]" color="blue"></lineup-number-column-desc>

  <lineup-ranking groupBy="cat" sortBy="a:desc">
    <lineup-support-column type="*"></lineup-support-column>
    <lineup-column column="*"></lineup-column>
    <lineup-impose-column label="a+cat" column="a" categoricalColumn="cat2"></lineup-impose-column>
  </lineup-ranking>
</lineup-lineup>
```


[CodePen](https://codepen.io/sgratzl/pen/BVMdZL)

![Advanced Result](https://user-images.githubusercontent.com/4129778/34654174-3235f784-f3f8-11e7-9361-44f5fa068bb9.png)

<p data-height="800" data-theme-id="light" data-slug-hash="BVMdZL" data-default-tab="result" data-user="sgratzl" data-pen-title="lineupjs advanced example" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/sgratzl/pen/BVMdZL/">lineupjs advanced example</a> by Samuel Gratzl (<a href="https://codepen.io/sgratzl">@sgratzl</a>) on <a href="https://codepen.io">CodePen</a>.</p>
