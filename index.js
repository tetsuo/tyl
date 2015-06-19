var bsp = require('bsp-tree');

module.exports = Pane;

function Pane (size) {
  if (!(this instanceof Pane)) return new Pane(size);
  this.tree = ('number' === typeof size) ? bsp(size) : size;
  this.view = null;
  this.panes = null;
}

Pane.prototype.attach = function (view) {
  this.view = view;
};

Pane.prototype.detach = function () {
  var view = this.view;
  this.view = null;
  return view;
};

Pane.prototype.split = function (vertical) {
  this.tree.split(vertical);
  var self = this;
  this.panes = this.tree.leafs.map(function (x) {
    return new Pane(x);
  });
  this.view = null;
  return this;
};

Pane.prototype.merge = function () {
  this.tree.merge();
  this.panes = null;
  return this;
};

Pane.prototype.render = function (Node) {
  var children = [];
  if (this.panes) {
    children = this.panes.map(function (x) {
      return new Node('td', {}, [ x.render(Node) ]);
    });
    if (!this.tree.dir) {
      children = children.map(function (x) {
        return new Node('tr', {}, [ x ]);
      });
    } else {
      children = new Node('tr', {}, children);
    }
  } else {
    children = new Node('tr', {}, [
      new Node('td', {}, [ this.view ].filter(Boolean))
    ]);
  }
  if (!Array.isArray(children)) children = [ children ];
  return new Node('table', {}, children);
};
