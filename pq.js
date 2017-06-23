const {red, green, blue} = require('./colors.js')

var PriorityQueue = function () {
  this.data = [];
}

PriorityQueue.prototype.push = function (tree) {
  if (!(tree instanceof Tree)) red("Can not push non-tree: ", tree);
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i].weight > tree.weight) {
      this.data.splice(i, 0 , tree);
    } else if (i === this.data.length - 1) {
      this.data.push(tree);
    }
  }
}
PriorityQueue.prototype.pop = function () {
  return this.data.shift();
}
PriorityQueue.prototype.length = function () {
  return this.data.length;
}

module.exports = {PriorityQueue}
