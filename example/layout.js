var tyl = require('..');
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

var pane = root = tyl(16),
    vertical = true;

while (pane.tree.data.shape[0] > 1) {
  vertical = !(pane.split(vertical).tree.dir);
  pane.panes[1].attach(createCell());
  pane = pane.panes[0];
}
pane.attach(createCell());

var node = createElement(root.render(VNode));
document.body.appendChild(node);