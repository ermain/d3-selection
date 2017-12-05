var tape = require("tape"),
    jsdom = require("./jsdom"),
    d3 = require("../");
    qt = require("d3-quadtree");

tape("d3.createIndex(…) returns a quadtree", function(test) {
  var array = [[1, 2], [3, 4]];
  test.ok(d3.createIndex(array) instanceof qt.quadtree);
  test.end();
});

tape("d3.selectRange returns a d3.selection"), function(test) {
  var array = [[0, 0]];
  var tree = d3.createIndex(array);
  var result = d3.selectRange(tree, 0, 0, 3, 3);
  test.ok(result instanceof d3.selection);
  test.end();
}

tape("d3.selectRange returns the appropiate points", function(test) {
  var array = [[1, 2], [1, 3], [4, 5], [4, 6]];
  var tree = d3.createIndex(array);
  var result = d3.selectRange(tree, 0, 0, 3, 3);
  test.deepEqual(result._groups, [[[1,2],[1,3]]]);
  test.end();
});

