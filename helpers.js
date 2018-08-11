const chalk = require('chalk')

module.exports.toCamelCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

module.exports.errorLog = (message) => console.log(`${chalk.white.bgRed.bold("Error:")} ${chalk.italic(message)}`)
module.exports.warningLog = (message) => console.log(`${chalk.white.bgYellow.bold("Warning:")} ${chalk.italic(message)}`)
module.exports.successLog = (message) => console.log(`${chalk.white.bgGreen.bold("Success:")} ${chalk.italic(message)}`)
module.exports.infoLog = (message) => console.log(`${chalk.white.bgGray.bold("Info:")} ${chalk.italic(message)}`)