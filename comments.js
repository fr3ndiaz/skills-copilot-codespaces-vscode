// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('./comments.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/comments', function(req, res) {
    res.json(comments);
});

app.post('/comments', function(req, res) {
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
            return;
        }
        res.json(comments);
    });
});

app.listen(3000);
console.log('Server is running');
