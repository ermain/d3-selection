//var quadtreelib = require("d3-quadtree");
import * as qt from "d3-quadtree";

// Create initial index object from scan of selection
function createIndex(data, x_accessor, y_accessor) {
    return qt.quadtree(data, x_accessor, y_accessor);
}

// Use the index to select on x, y values
// Will select a rectagular box with lower left corner = x_lower,y_lower and upper right corner = x_upper,y_upper
// Null arguments will be treated as either 0 (for x_lower, y_lower) or max (for x_upper, y_upper)
function selectRange(tree, x_lower, y_lower, x_upper, y_upper){
    // This callback is for traversing the quadtree
    // node: node being visited
    // <x0, y0> lower bounds of node
    // <x1, y1> upper bounds of node
    var nodelist = [];
    function visitCallback(node, x0, y0, x1, y1) {
         // Iterate through the list of nodes at this point.
         if (!node.length) {
           do {
             // Save the node if we care about it.
             var xdata = tree.x()(node.data);  // Get x and y data 
             var ydata = tree.y()(node.data);
             if ( x_lower <= xdata && xdata <= x_upper && y_lower <= ydata && ydata <= y_upper) {
                nodelist.push(node.data);
             }
           } while (node = node.next);
         }
         // Return True if this quadrant does not intersect our area of interest.
         return (x0 > x_upper || 
                 x1 < x_lower || 
                 y0 > y_upper ||
                 y1 < y_lower); 

    }
    tree.visit(visitCallback);
    return nodelist;
}

export { createIndex, selectRange };
