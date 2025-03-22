#!/usr/bin/env node

const fs = require('fs');
const path = require('path')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const readline = require('node:readline');

const logFile = path.join(__dirname, yargs(hideBin(process.argv)).argv._[0]);

const logWriter = fs.createWriteStream(logFile, { flags: 'a' });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const number = Math.round(1 + Math.random());
console.log('Welcome to the coin flip. Heads(1) or tails(2)?')
rl.on('line', (line) => {
    if (number == line) {
        logWriter.write('1\n');
        if (line == 1) {
            console.log('You won, it was heads!')
        } else {
            console.log('You won, it was tails!')
        }
    } else {
        logWriter.write('0\n');
        console.log('Sorry, you lost');
    }
    rl.close();
}); 
