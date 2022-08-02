const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.text())
app.use(express.json())

// GET 
app.get('/api/student/:id/hello/:name', (req, res) => {
    console.dir(req.path);
    res.send({ q: req.query, p: req.params });
})

app.post('/api/student/:id', (req, res) => {
    console.dir({ q: req.query, p: req.params });
    res.send(req.body);
})

// which request, what handler
app.use('/', (req, res) => {
    console.log(`request received at ${new Date()}`);
    //console.log('req', req);
    //console.dir(res);
    res.send(`request received at ${new Date()}`);
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});