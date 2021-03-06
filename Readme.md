# tyl

arranges layout elements in a grid.

See also [bsp-tree](https://github.com/tetsuo/bsp-tree).

# example

![screenshot](http://i.imgur.com/7tX9Cys.png)

to build such a tyl that recursively divides its first half:

```js
var tyl = require('tyl');
var VNode = require('virtual-dom/vnode/vnode');
var createElement = require('virtual-dom/create-element');
var randomColor = require('randomcolor');

function createCell () {
  var node = new VNode('div', {
    style: {
      height: '100%',
      backgroundColor: randomColor({ luminosity: 'light' })
    } 
  });
  return node;
}

var pane = root = tyl(16), // 16x16
    vertical = true;

while (pane.tree.data.shape[0] > 1) {
  vertical = !(pane.split(vertical).tree.dir);
  pane.panes[1].attach(createCell());
  pane = pane.panes[0];
}
pane.attach(createCell());

var node = createElement(root.render(VNode));
document.body.appendChild(node);
```

# api

```js
var tyl = require('tyl');
```

## var pane = tyl(size)
## pane.split(vertical)
## pane.merge()
## pane.attach(node)
## var node = pane.detach()
## var tree = pane.render(Node)

# license

mit