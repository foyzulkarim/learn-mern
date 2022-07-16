const fs = require('fs');
const { stdin, stdout } = require('process');
const writableStream = fs.createWriteStream('./streams/output.txt');

stdin.pipe(writableStream);