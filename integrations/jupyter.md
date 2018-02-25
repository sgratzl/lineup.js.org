---
title: Jupyter Widget
layout: page
---

A [Jupyter Widget](https://jupyter.org/widgets.html) wrapper for Python is located at [lineup_widget](https://github.com/sgratzl/lineup_widget).

Installation
------------

```bash
pip install -e git+https://github.com/sgratzl/lineup_widget.git#egg=lineup_widget
jupyter nbextension enable --py [--sys-prefix|--user|--system] lineup_widget
```

Or, if you use jupyterlab:

```bash
pip install -e git+https://github.com/sgratzl/lineup_widget.git#egg=lineup_widget
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

Examples
--------

[![Launch Binder][binder-image]][binder-url]

[binder-image]: https://camo.githubusercontent.com/70c5b4d050d4019f4f20b170d75679a9316ac5e5/687474703a2f2f6d7962696e6465722e6f72672f62616467652e737667
[binder-url]: http://mybinder.org/repo/sgratzl/lineup_widget/examples


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
from ipywidgets import interact

def selection_changed(selection):
    return df.iloc[selection]

interact(selection_changed, selection=lineup_widget.LineUpWidget(df));
```

![interact example](https://user-images.githubusercontent.com/4129778/35321846-6c5b07cc-00e8-11e8-9388-0acb65cbb509.png)

