const path = require('path')
const fs = require('fs')

// console.log(path.parse(__filename));

// const test_path = path.join(__dirname, 'test.txt');
// console.log(test_path);

const dir = path.join(__dirname, 'test');
// fs.mkdir(dir, (err) => {
//     if (err) throw Error(err);
//     console.log('Directory created!');
// });

const file = path.join(dir, 'new.txt');

fs.appendFile(file, 'Hello, world!\n', (err) => {
    if (err) throw Error(err);
    console.log('Written to file');
});

fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw Error(err);
    console.log(data);
});