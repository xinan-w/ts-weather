// // import * as commander from 'commander';
// var colors = require('colors');
// import program from 'commander';



// function range(val:any) {
//     return val.split('..').map(Number);
// }

// function list(val:any) {
//     return val.split(',');
// }

// function collect(val:any, memo:any) {
//     memo.push(val);
//     return memo;
// }

// function increaseVerbosity(v:any, total:any) {
//     return total + 1;
// }

// program
//     .version('0.1.0')
//     .usage('[options] <file ...>')
//     .option('-i, --integer <n>', 'An integer argument', parseInt)
//     .option('-f, --float <n>', 'A float argument', parseFloat)
//     .option('-r, --range <a>..<b>', 'A range', range)
//     .option('-l, --list <items>', 'A list', list)
//     .option('-o, --optional [value]', 'An optional value')
//     .option('-c, --collect [value]', 'A repeatable value', collect, [])
//     .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
//     .parse(process.argv);

// console.log(' int: %j', program.integer);
// console.log(' float: %j', program.float);
// console.log(' optional: %j', program.optional);
// program.range = program.range || [];
// console.log(' range: %j..%j', program.range[0], program.range[1]);
// console.log(' list: %j', program.list);
// console.log(' collect: %j', program.collect);
// console.log(' verbosity: %j', program.verbose);
// console.log(' args: %j', program.args);

var program = require('commander');
var colors = require('colors');

program
    .version('0.1.0')
    .command('getstream [url]', 'get stream URL')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp(make_red);
}

function make_red(txt:string) {
    return colors.red(txt); // display the help text in red on the console
}
