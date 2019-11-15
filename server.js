const express = require('express')
const app = express()

const medias = require('./medias');
const feedback = require('./feedback');

app.use(express.static('public'))

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

app.get('/', function (req, res) {
    res.send('Hello World')
})

//stack overflow
app.get('/medias/so/:id', async (req, res) => {
    let d = await medias.getStackOverflowData(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    res.send(d);
})

app.post('/feedback', jsonParser, async (req, res) => {
    feedback.save(req.body).then(success => {
        if (success) {
            res.send('success');
        } else {
            res.send('error')
        }
    })
})

var port = process.env.PORT || 3000;

app.listen(port);