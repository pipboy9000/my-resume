const express = require('express')
const app = express()

const medias = require('./medias');

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.send('Hello World')
})

//stack overflow
app.get('/medias/so/:id', async function (req, res) {
    let d = await medias.getStackOverflowData(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.send(d);
})

var port = process.env.PORT || 3000;

app.listen(port);