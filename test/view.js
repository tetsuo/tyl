var test = require('tap').test;
var Pane = require('..');
var util = require('./util');

test('attach/detach', function (t) {
  var pane = Pane(4);
  var a = new util.Node('a', null, [
    new util.Node('b', null, [])
  ]);
  var c = new util.Node('c', null, []);
  pane.split(true);
  pane.panes[0].attach(a);
  pane.panes[1].split();
  pane.panes[1].panes[0].attach(c);
  t.equal(util.repr(pane.render(util.Node)), util.fixture('view1'));
  pane.panes[1].merge();
  t.equal(util.repr(pane.render(util.Node)), util.fixture('view2'));
  var expected = pane.panes[0].detach();
  t.equal(util.repr(pane.render(util.Node)), util.fixture('vertical-edge'));
  t.equal(a, expected);
  t.end();
});