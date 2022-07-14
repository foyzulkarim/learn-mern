const fs = require('node:fs');
const Event = require('node:events');
const log = console.log;

const event = new Event();

event.on('read', async () => {
    const data = await fs.promises.readFile(fileName, 'utf-8');
    log('reading: ', data);
})

// fs.writeFileSync("file1.txt", "Hello world!");
const fileName = "file1.txt";

fs.appendFile(fileName,
    `\n${new Date().toLocaleString()}`,
    () => {
        log('writing finished');
        event.emit('read');
    });

log('writing started');
