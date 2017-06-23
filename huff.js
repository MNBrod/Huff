// const { red, blue, green } = require('./colors.js');
// const PQ = require('./pq.js');

var PriorityQueue = function () {
  this.data = [];
}

PriorityQueue.prototype.pop = function () {
  return this.data.shift();
}
PriorityQueue.prototype.length = function () {
  return this.data.length;
}
PriorityQueue.prototype.push = function (tree) {
  //if (!(tree instanceof Tree)) console.log("Can not push non-tree: ", tree);

  //console.log(this.length());
  if (this.length() === 0) {
    this.data.push(tree);
  }
  for (var i = 0; i < this.length(); i++) {
    if (this.data[i].weight > tree.weight) {
      this.data.splice(i, 0, tree);
      //console.log("Added at ", i);
      break;
    } else if (i === this.data.length - 1) {
      //console.log("Added to end ", i);
      this.data.push(tree);
      break;
    }
  }
}

var Tree = function (weight, ele) {
  this.left = null;
  this.right = null;
  this.element = ele || null;
  this.weight = weight || 0;
  this.Leaf = true;
}
Tree.prototype.assignChildren = function (left, right) {
  this.right = right;
  this.left = left;
  this.weight = right.weight + left.weight;
  this.Leaf = false;
}
Tree.prototype.isLeaf = function () {
  if (this.left === null && this.right === null) return true;
}

var frequencies = function (str) {
  var freq = {};
  var arr = str.split('');
  for (let i = 0; i < str.length; i++) {
    if (arr[i] in freq) freq[arr[i]]++;
    else {
      freq[arr[i]] = 1;
    }
  }
  var result = [];
  var keys = Object.keys(freq);
  var vals = Object.keys(freq).map(function (key) {
    return freq[key];
  });
  for (let i = 0; i < keys.length; i++) {
    result.push([keys[i], vals[i]]);
  }
  return result;
}

var makeQueue = function (freqs) {
  var treeQueue = new PriorityQueue();
  for (var i = 0; i < freqs.length; i++) {
    treeQueue.push(new Tree(freqs[i][1], freqs[i][0]));
    //console.log(treeQueue.data);
  }
  return treeQueue;
}

var combineQueue = function (queue) {
  // var i = 0;
  while (queue.length() > 2) {
    //console.log(queue.data.length);
    var lefter = queue.pop();
    var righter = queue.pop();
    var temp = new Tree();
    temp.assignChildren(lefter, righter);
    queue.push(temp);
  }
  var lefter = queue.pop();
  var righter = queue.pop();
  var temp = new Tree();
  temp.assignChildren(lefter, righter);
  queue.push(temp);
  return queue.pop();
}

var generateMapHelper = function (results, tree, path) {
  if (tree.isLeaf()) {
    results[tree.element] = path;
  } else {
    let leftPath = path + '0';
    generateMapHelper(results, tree.left, leftPath);
    let rightPath = path + '1';
    generateMapHelper(results, tree.right, rightPath);
  }
}

var generateMap = function (tree) {
  var result = {};
  generateMapHelper(result, tree, '');
  return result;
}

var encode = function (freq, str) {
  if (freq.length < 2 || str === null) return null;
  //console.log(freq);
  var result = '';
  var queue = makeQueue(freq);
  var tree = combineQueue(queue);
  var map = generateMap(tree);
  //console.log(tree);
  console.log(map);
  for (var i = 0; i < str.length; i++) {
    result += map[str.charAt(i)];
  }
  return result;
}

var decode = function (freq, str) {
  var result = "";
  if (freq.length < 2 || str === null) return null;
  var queue = makeQueue(freq);
  var tree = combineQueue(queue);
  var map = generateMap(tree);
  var partial = '';
  var arr = str.split('');
  var flipped = {};
  for (const key in map) {
    flipped[map[key]] = key;
  }
  //console.log(flipped)
  while (arr.length) {
    partial += arr.shift();
    if (flipped.hasOwnProperty(partial)) {
      result += flipped[partial];
      partial = "";
    }
  }
  return result;
}



var test = "Hello World!";
var testFreq = frequencies(test);
var example = "aaaabcc"
var exampleFreq = frequencies(example);
var exEncoded = encode(exampleFreq, example);
//console.log(exEncoded);
//console.log(decode(exampleFreq, exEncoded));

// var encoded = encode(testFreq, test);
// console.log(encoded);
// console.log(decode(testFreq, encoded));
// 1. makeQueue
// 2. combineQueue
// 3. generateMap
