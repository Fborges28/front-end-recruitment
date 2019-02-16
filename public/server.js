var express = require('express');
var path = require("path");
var fs = require("fs");
var cors = require('cors');

var usersFilePath = path.join(__dirname, 'data/products.json');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/products', cors(), function(req, res){
    var readable = fs.createReadStream(usersFilePath);
    res.setHeader('Content-Type', 'application/json');
    readable.pipe(res);
});

app.listen(9001, function () {
  console.log('Montando o servidor de retorno do json');
});
