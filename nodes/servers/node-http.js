const http = require('node:http');

const server = http.createServer((req, res) => {
    console.log('request: ', req.rawHeaders, req.url, req.method);
    res.setHeader('content-type', 'application/json');
    res.end(`<h1>Thanks ${new Date()}</h1>`);
});

server.listen(3000, "localhost", () => {
    console.log(`server is listening on port 3000`);
})