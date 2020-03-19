global.config = require('./config.json');
var fs = require('fs');
var server = require('http');

server.createServer((req, res)=>{
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(fs.readFileSync('./views/test.html', 'utf8'));
}).listen(config.PORT, ()=>{
    console.log('Server running up at: '+ config.HOST+':'+config.PORT);
});