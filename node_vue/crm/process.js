const process = require('process');
const chalk = require('chalk');

console.log(chalk.green(`请输入：`));

process.stdin.on('data', chunk => {
    console.log(chunk)
})