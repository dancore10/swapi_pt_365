global.config = require('./config.json');
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var server = http.createServer(app);

app.set('view engine','html');

app.use(express.static(path.join(__dirname, '/views/public')));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})

server.listen(config.PORT, ()=>{
    console.log('Server running up at: '+ config.HOST+':'+config.PORT);
});