//BST balanced by height
class BinarySearchTree {
  constructor (parent) {
    this.parent = parent || null;
    this.left = null;
    this.right = null;
    this.key = null;
    this.value = null;
    this.numLeftChildren = 0;
    this.numRightChildren = 0;
    this.height = 0;
    this.depth = 0;
    this.id = '' + Math.random(); //used to uniquely identify nodes when displaying with d3
  }

  //inserts a key and rebalances
  insert (key, value) {
    value = value || key;

    //leafs need to insert the value at themself and make new leaf children
    if(this.height == 0) {
      this.key = key;
      this.value = value || key;
      this.left = new BinarySearchTree(this);
      this.right = new BinarySearchTree(this);
      this.height = 1;
      this.numLeftChildren = 1;
      this.numRightChildren = 1;
      return;
    }

    if(key == this.key) return;

    if(key < this.key) {
      this.numLeftChildren++;
      this.left.insert(key);
      this.height = Math.max(this.height, 1 + this.left.height);
    }
    if(key >= this.key) {
      this.numRightChildren++;
      this.right.insert(key);
      this.height = Math.max(this.height, 1 + this.right.height);
    }

    this.rebalance();
  }

  //this is done a little strangely so that the pointer to the root node never
  //changes, instead the children are moved and keys are switched
  rebalance () {
    var leftNode = this.left;
    var rightNode = this.right;

    if((this.numLeftChildren > 1 && this.numRightChildren == 0) ||
      (this.numLeftChildren > 0 && this.numRightChildren > 0 && leftNode.height > rightNode.height + 1)
    ) {
      if((leftNode.numLeftChildren > 0 && leftNode.numRightChildren == 0) ||
        (leftNode.numLeftChildren > 0 && leftNode.numRightChildren > 0 && leftNode.left.height > leftNode.right.height)
        //^maybe not necessary
      ) {
        //extra value is on the outside -> single rotation
        this.rotateRight();
      }else {
        //extra value is on the inside -> double rotation
        leftNode.rotateLeft();
        this.rotateRight();
      }
    }else if((this.numRightChildren > 1 && this.numLeftChildren == 0) ||
      (this.numLeftChildren > 0 && this.numRightChildren > 0 && rightNode.height > leftNode.height + 1)
    ) {
      if((rightNode.numRightChildren > 0 && rightNode.numLeftChildren == 0) ||
        (rightNode.numLeftChildren > 0 && rightNode.numRightChildren > 0 && rightNode.right.height > rightNode.left.height)
      ) {
        //extra value is on the outside -> single rotation
        this.rotateLeft();
      }else {
        //extra value is on the inside -> double rotation
        rightNode.rotateRight();
        this.rotateLeft();
      }
    }
  }


  //move counterclockwise
  rotateLeft () {
    var leftNode = this.left;
    var rightNode = this.right;

    if(leftNode !== null) leftNode.parent = rightNode;
    if(rightNode.right !== null) rightNode.right.parent = this;

    var temp = this.key;
    this.key = rightNode.key;
    rightNode.key = temp;

    this.right = rightNode.right;
    this.numRightChildren -= rightNode.numLeftChildren + 1;
    rightNode.right = rightNode.left;
    rightNode.numRightChildren = rightNode.numLeftChildren;
    rightNode.left = this.left;
    rightNode.numLeftChildren = this.numLeftChildren;
    this.left = rightNode;
    this.numLeftChildren += rightNode.numRightChildren + 1;

    rightNode.height = 0;
    if(rightNode.numLeftChildren > 0)rightNode.height = Math.max(rightNode.height, 1 + rightNode.left.height);
    if(rightNode.numRightChildren > 0)rightNode.height = Math.max(rightNode.height, 1 + rightNode.right.height);
    this.height = 0;
    if(this.numLeftChildren > 0)this.height = Math.max(this.height, 1 + this.left.height);
    if(this.numRightChildren > 0)this.height = Math.max(this.height, 1 + this.right.height);
  }

  //move clockwise
  rotateRight () {
    var leftNode = this.left;
    var rightNode = this.right;

    if(rightNode !== null) rightNode.parent = leftNode;
    if(leftNode.left !== null) leftNode.left.parent = this;

    var temp = this.key;
    this.key = leftNode.key;
    leftNode.key = temp;

    this.left = leftNode.left;
    this.numLeftChildren -= leftNode.numRightChildren + 1;
    leftNode.left = leftNode.right;
    leftNode.numLeftChildren = leftNode.numRightChildren;
    leftNode.right = this.right;
    leftNode.numRightChildren = this.numRightChildren;
    this.right = leftNode;
    this.numRightChildren += leftNode.numLeftChildren + 1;

    leftNode.height = 0;
    if(leftNode.numLeftChildren > 0)leftNode.height = Math.max(leftNode.height, 1 + leftNode.left.height);
    if(leftNode.numRightChildren > 0)leftNode.height = Math.max(leftNode.height, 1 + leftNode.right.height);
    this.height = 0;
    if(this.numLeftChildren > 0)this.height = Math.max(this.height, 1 + this.left.height);
    if(this.numRightChildren > 0)this.height = Math.max(this.height, 1 + this.right.height);
  }

  //in order traversal of the nodes
  traversal () {
    var elements = [];
    if(this.height == 0) return elements;
    elements.push(...this.left.traversal());
    elements.push(this);
    elements.push(...this.right.traversal());

    return elements;
  }

  //traversal by each level from the root to the leaves
  levelTraversal () {
    let elements = [];
    let agenda = [this];
    while(agenda.length > 0) {
      let curElem = agenda.shift();
      if(curElem.height == 0) continue;
      elements.push(curElem);
      agenda.push(curElem.left);
      agenda.push(curElem.right);
    }
    return elements;
  }

  getAncestors () {
    let ancestors = [];
    let curElem = this;
    while(curElem.parent !== null) {
      curElem = curElem.parent;
      ancestors.push(curElem);
    }
    return ancestors;
  }

  find (key) {
    if(key == this.key) {
      return this;
    }else if(key < this.key) {
      return this.numLeftChildren > 0 ? this.left.find(key) : null;
    }

    return this.numRightChildren > 0 ? this.right.find(key) : null;
  }
}

export default BinarySearchTree;
