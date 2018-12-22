---
title: Jupyter Widget
layout: page
---

A [Jupyter Widget](https://jupyter.org/widgets.html) wrapper for Python is located at [lineup_widget](https://github.com/lineupjs/lineup_widget).

Installation
------------

1. install Jupyter Widgets
   ```bash
   pip install ipywidgets
   jupyter nbextension enable --py widgetsnbextension
   ```

1. install library
   ```bash
   pip install lineup_widget
   jupyter nbextension enable --py --sys-prefix lineup_widget
   ```

1. OR directly via repository (requires node and npm to be installed):
   ```bash
   pip install -e git+https://github.com/lineupjs/lineup_widget.git#egg=lineup_widget
   jupyter nbextension enable --py --sys-prefix lineup_widget
   ```

1. Jupyterlab
   ```bash
   jupyter labextension install @jupyter-widgets/jupyterlab-manager
   jupyter labextension install lineup_widget
   ```

Examples
--------

[![Launch Binder][binder-image]][binder-url]

```python
import lineup_widget
import pandas as pd
import numpy as np

df = pd.DataFrame(np.random.randint(0,100,size=(100, 4)), columns=list('ABCD'))

w = lineup_widget.LineUpWidget(df)
w.on_selection_changed(lambda selection: print(selection))
w
```

![simple usage](https://user-images.githubusercontent.com/4129778/35321859-7925d3a6-00e8-11e8-9884-bcbc76ae51c9.png)

```python
from __future__ import print_function
from ipywidgets import interact, interactive, interact_manual

def selection_changed(selection):
    return df.iloc[selection]

interact(selection_changed, selection=lineup_widget.LineUpWidget(df));
```

![interact example](https://user-images.githubusercontent.com/4129778/35321846-6c5b07cc-00e8-11e8-9388-0acb65cbb509.png)

**Hint**: 

In case you see scrollbars in each cell it is because of the font the cells are too narrow, you can specify a larger row height using
```python
w = lineup_widget.LineUpWidget(df, options=dict(rowHeight=20))
```
