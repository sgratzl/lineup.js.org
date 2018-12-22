---
title: Dev Env
layout: page
menu: bar
---

Dependencies
------------

LineUp.js depends on 
 * [LineUpEngine](https://github.com/lineupjs/lineupengine) table rendering engine
 * [D3](http://d3js.org) utilities: scales, format
 * [Popper.js](https://popper.js.org) dialogs


**Development Dependencies**

[Webpack](https://webpack.github.io) is used as build tool. LineUp itself is written in [TypeScript](https://www.typescriptlang.org) and [SASS](https://sass-lang.com). 


**Tools & Services**

<div class="row">
  <div class="col s3">
    <a href="https://www.browserstack.com"><img src="./assets/services/Browserstack-logo.svg" alt="Browserstack"></a>
  </div>
  <div class="col s3">
    <a href="https://circleci.com/"><img src="./assets/services/circleci.svg" alt="CircleCI" style="max-height: 4em;"></a>
  </div>
</div>



Development Environment
-----------------------

**Installation**

```bash
git clone https://github.com/lineupjs/lineupjs.git -b develop
cd lineupjs
npm install
```

**Build distribution packages**

```bash
npm run build
```

**Run tests**

```bash
npm test
```


**Run Linting**

```bash
npm run lint
```


**Serve integrated webserver**

```bash
npm start
```
