// import * as commander from 'commander';
// const program = require('commander');
import { Command } from 'commander';
const command = new Command();
command
    .version('0.1.0')
    .option('-p, --peppers [name]', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbp-sauce', 'Add bbq sauce')
    // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .option('-c, --city [name]', 'Add city name');
command.parse(process.argv);

console.log(command.city)
