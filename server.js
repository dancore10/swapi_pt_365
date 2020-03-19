global.config = require('./config.json');
var path = require('path');
var server = require('http')

server.createServer((req, res)=>{
    res.sendFile('test');
    res.end();
}).listen(config.PORT, ()=>{
    console.log('Server running up at: '+ config.HOST+':'+config.PORT);
});
