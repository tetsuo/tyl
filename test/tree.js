var test = require('tap').test;
var Pane = require('..');
var util = require('./util');

test('root', function (t) {
  var pane = Pane(4);
  t.equal(util.repr(pane.render(util.Node)), util.fixture('root'));
  t.end();
});

test('horizontal edge', function (t) {
  var pane = Pane(4);
  pane.split();
  t.equal(util.repr(pane.render(util.Node)), util.fixture('horizontal-edge'));
  pane.merge();
  t.equal(util.repr(pane.render(util.Node)), util.fixture('root'));
  t.end();
});

test('vertical edge', function (t) {
  var pane = Pane(4);
  pane.split(true);
  t.equal(util.repr(pane.render(util.Node)), util.fixture('vertical-edge'));
  pane.merge();
  t.equal(util.repr(pane.render(util.Node)), util.fixture('root'));
  t.end();
});

test('subtrees', function (t) {
  var pane = Pane(4);
  pane.split();
  pane.panes[0].split();
  pane.panes[1].split(true);
  t.equal(util.repr(pane.render(util.Node)), util.fixture('subtrees'));
  pane.panes[1].merge();
  t.equal(util.repr(pane.panes[1].render(util.Node)), util.fixture('root'));
  pane.panes[0].split(true);
  t.equal(util.repr(pane.panes[0].render(util.Node)), util.fixture('vertical-edge'));
  t.end();
});