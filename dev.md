---
title: Development Environment
layout: page
menu: bar
---

Dependencies
------------

LineUp.js depends on 

<div class="collection">
  <a href="https://github.com/lineupjs/lineupengine" target="_blank" rel="noopener" class="collection-item">LineUpEngine - table rendering engine</a>
  <a href="https://d3js.org" target="_blank" rel="noopener" class="collection-item">D3 - utilities: scales, format</a>
  <a href="https://popper.js.org"  target="_blank" rel="noopener" class="collection-item">Popper.js - dialogs</a>
</div>

Development Dependencies
------------

[Webpack](https://webpack.github.io) is used as build tool. LineUp itself is written in [TypeScript](https://www.typescriptlang.org) and [SASS](https://sass-lang.com). 


Tools & Services
------------

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
