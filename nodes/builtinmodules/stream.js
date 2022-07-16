const fs = require('fs');
const log = console.log;

const fileName = './streams/lms.pdf';
const readableStream = fs.createReadStream(fileName, { highWaterMark: 1024 });
const writableStream = fs.createWriteStream('./streams/lms-copy.pdf');
readableStream.pipe(writableStream);

let iterator = 0;
readableStream.on('data', (chunk) => {
    log(++iterator, '\t', chunk.length);
});

readableStream.on('end', () => {
    log('end');
});