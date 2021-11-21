var http =require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {

    var store = '';
    console.log(req.headers['content-type']);
    req.on('data' ,(chunk) => {
        store += chunk;
    });
    req.on('end' ,() =>{

    })
}

server.listen( 4000,() => {
 console.log('server is listeing on port 4000');
});