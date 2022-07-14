const os = require('node:os');
console.log(JSON.stringify(os.cpus()));
console.log(os.version())