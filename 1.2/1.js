const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')

argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: 'y',
        type: 'boolean',
        default: 'false',
        description: 'Show the year'
    })
    .option('month', {
        alias: 'm',
        type: 'boolean',
        default: 'false',
        description: 'Show the month'
    })
    .option('date', {
        alias: 'd',
        type: 'boolean',
        default: 'false',
        description: 'Show the date'
    })
    .argv;

const date = new Date();

if (argv._[0] === 'current') {
    if (argv.year === true) {
        console.log(date.getFullYear());
    } else if (argv.month === true) {
        console.log(date.getMonth() + 1);
    } else if (argv.date === true) {
        console.log(date.getDate());
    } else {
        console.log(date);
    }
} else if (argv._[0] === 'add') {
    const by = argv._[1];

    if (argv.year === true) {
        date.setFullYear(date.getFullYear() + by);
        console.log(date);
    } else if (argv.month === true) {
        date.setMonth(date.getMonth() + by);
        console.log(date);
    } else if (argv.date === true) {
        date.setDate(date.getDate() + by);
        console.log(date);
    }
} else if (argv._[0] === 'sub') {
    const by = argv._[1];

    if (argv.year === true) {
        date.setFullYear(date.getFullYear() - by);
        console.log(date);
    } else if (argv.month === true) {
        date.setMonth(date.getMonth() - by);
        console.log(date);
    } else if (argv.date === true) {
        date.setDate(date.getDate() - by);
        console.log(date);
    }
}