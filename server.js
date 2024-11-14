const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let data = []; // Simulating a database with an array
let currentId = 1; // Simple ID counter

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// POST /data
app.post('/data', (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).send('Unsupported Media Type');
    }
    const newData = req.body;
    newData.id = currentId++;
    data.push(newData);
    res.status(201).json(newData);
});

// DELETE /data/:id
app.delete('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).send('Not Found');
    }
    data.splice(index, 1);
    res.status(204).send();
});

// PUT /data/:id
app.put('/data/:id', (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).send('Unsupported Media Type');
    }
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).send('Not Found');
    }
    const updatedData = req.body;
    data[index] = { ...data[index], ...updatedData };
    res.status(200).json(data[index]);
});

app.put('/data/:id', (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).send('Unsupported Media Type');
    }
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        const newData = req.body;
        newData.id = id;
        data.push(newData);
        return res.status(201).json(newData);
    }
    const updatedData = req.body;
    data[index] = { ...data[index], ...updatedData };
    res.status(200).json(data[index]);
});

