---
title: Dev Env
layout: page
menu: bar
---

Dependencies
------------

LineUp.js depends on 
 * [LineUpEngine](https://github.com/sgratzl/lineupengine) table rendering engine
 * [D3](http://d3js.org) utilities: scales, format, dragging
 * [Popper.js](https://popper.js.org) dialogs


**Development Dependencies**

[Webpack](https://webpack.github.io) is used as build tool. LineUp itself is written in [TypeScript](https://www.typescriptlang.org) and [SASS](https://sass-lang.com). 


**Tools & Services**

[![Browserstack](./assets/services/Browserstack-logo.svg)](https://www.browserstack.com)
[![CircleCI](./assets/services/circleci.svg)](https://circleci.com/)

Development Environment
-----------------------

**Installation**

```bash
git clone https://github.com/datavisyn/lineupjs.git -b develop
cd lineupjs
npm install
```

**Build distribution packages**

```bash
npm run build
```

**Run Linting**

```bash
npm run lint
```


**Serve integrated webserver**

```bash
npm run start
```
