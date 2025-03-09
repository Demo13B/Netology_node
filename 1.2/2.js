#!/usr/bin/env node

const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const number = Math.floor(Math.random() * 100);

console.log('The number is between 0 and 100');
rl.on('line', (line) => {
    if (line.trim() == number) {
        console.log('You guessed the number!');
        rl.close();
    } else if (line.trim() > number) {
        console.log('Lesser');
    } else {
        console.log('Greater');
    }
});
