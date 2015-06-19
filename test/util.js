exports.Node = Node;
exports.repr = repr;
exports.fixture = fixture;

var fs = require('fs');

var cache = {};
function fixture (x) {
  if (cache[x]) return cache[x];
  var s = fs.readFileSync(__dirname + '/' + x + '.txt', 'utf8');
  cache[x] = s;
  return s;
}

function Node (tag, attrs, children) {
  this.tag = tag;
  this.children = children;
}

function repr (node, i) {
  i = i || 1;
  var children = node.children.map(function (x) {
    return repr(x, i + 1);
  });
  var s = node.tag;
  if (children.length) s += '\n';
  var z = '';
  for (var k = 0; k < i; ++ k) {
    z += ' ';
  }
  s += z + children.join('\n' + z);
  return s.trim();
}
