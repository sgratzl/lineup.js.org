---
title: R Shiny
---

R, RShiny, and R Markdown Support
=================================

A [HTMLWidget](http://www.htmlwidgets.org/) wrapper for R is located at [lineup_htmlwidget](https://github.com/sgratzl/lineup_htmlwidget). 
It can be used within standalone [R Shiny](https://shiny.rstudio.com/) apps or [R Markdown](http://rmarkdown.rstudio.com/) files. Integrated plotting does not work due to an outdated integrated Webkit version in RStudio.
[Crosstalk](https://rstudio.github.io/crosstalk/) is supported for synching selections and filtering among widgets. 

Installation
------------

```R
devtools::install_github("rstudio/crosstalk")
devtools::install_github("sgratzl/lineup_htmlwidget")
library(lineup)
```

Examples
--------

```R
lineup(iris)
```

![iris output](https://user-images.githubusercontent.com/4129778/34919941-fec50232-f96a-11e7-95be-9eefb213e3d6.png)


