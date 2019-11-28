// import * as commander from 'commander';
// const program = require('commander');
var colors = require('colors');
// import colors from 'colors';
import commander from 'commander';
// const command = new Command();
commander
    .version('0.1.0')
    .option('-p, --peppers [name]', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbp-sauce', 'Add bbq sauce')
    .option('-c, --city [name]', 'Add city name')
    .parse(process.argv);
// if (!commander.city) {
//     commander.outputHelp();
// }
// if (commander.city) {
//     console.log(commander.city.green)
// }
if (process.argv.slice(2).length === 0) {
    commander.outputHelp(colors.red)
    process.exit();
}
