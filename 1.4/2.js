#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const readline = require('node:readline');

const logFile = path.join(__dirname, yargs(hideBin(process.argv)).argv._[0]);

const readerStream = fs.createReadStream(logFile).setEncoding('utf-8');

const rl = readline.createInterface({
    input: readerStream
});

let total = 0;
let wins = 0;
let losses = 0;
rl.on('line', (line) => {
    total++;
    if (line == 1) {
        wins++;
    } else {
        losses++;
    }
});

rl.on('close', () => {
    console.log(`Games played: ${total}`);
    console.log(`Won: ${wins} Lost: ${losses}`)
    console.log(`Winrate: ${wins / losses}`)
});


