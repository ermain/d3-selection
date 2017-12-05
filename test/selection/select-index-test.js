var tape = require("tape"),
    jsdom = require("../jsdom"),
    d3 = require("../../");
    qt = require("d3-quadtree");

tape("d3.createIndex(…) returns a quadtree", function(test) {
  var array = [[1, 2], [3, 4]];
  var document = jsdom();
  test.ok(d3.select(document).createIndex(array) instanceof qt.quadtree);
  test.end();
});

tape("d3.selectRange returns the appropiate points", function(test) {
  var array = [[1, 2], [1, 3], [4, 5], [4, 6]];
  var document = jsdom();
  var tree = d3.select(document).createIndex(array);
  var result = d3.select(document).selectRange(tree, 0, 0, 3, 3);
  test.deepEqual(result, [[1,2],[1,3]]);
  test.end();

});

