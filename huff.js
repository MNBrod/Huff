const {red, blue, green} = require('./colors.js')
var Tree = function (ele) {
  this.left = null;
  this.right = null;
  this.element = ele || null;
  this.weight = 0;
}

var PriorityQueue = function () {
  this.data = [];
}
PriorityQueue.prototype.push = function (tree) {
  if (!(tree instanceof Tree)) red("Can not push non-tree: ", tree);
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i].weight> tree.weight) {
      this.data.splice(i, 0 , tree);
    } else if (i = this.data.length - 1) {
      this.data.push(tree);
    }
  }
}
PriorityQueue.prototype.pop = function () {
  return this.data.shift();
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
