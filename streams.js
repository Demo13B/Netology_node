const fs = require('fs');

const readerStream = fs.createReadStream('path.js');

// let data = '';
// readerStream
//     .setEncoding('utf-8')
//     .on('data', (dataChunk) => {
//         data += dataChunk;
//     })
//     .on('end', () => {
//         console.log(data);
//     });

let string = 'Hello, world!\n';
const writerStream = fs.createWriteStream('output.txt');

writerStream.on('close', () => {
    console.log('Written to file');
});

// writerStream.write(string);
// writerStream.write(string);
// writerStream.close();

readerStream.pipe(writerStream);