var chalk = require('chalk')

var red = function (str) {
  console.log(chalk.red(str));
}
var green = function (str) {
  console.log(chalk.green(str));
}
var blue = function (str) {
  console.log(chalk.blue(str));
}

module.exports = {red, green, blue};
