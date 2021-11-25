var http = require ('http');
var server = http.createServer(handleRequest);
var qs = require('querystring');
var fs = require('fs');

function handleRequest(req,res ){
 var storeData = '';
 req.on('data',(chunk) =>{
    storeData += chunk;
 });
 req.on('end',()=>{
 if(req.url === '/form' && req.method === 'GET'){
     res.setHeader('content-Type' ,'text/html');
     fs.createReadStream('./form.html').pipe(res);
 }
 if(req.method ==='POST' && req.url ==='/form'){
     var parsedData = qs.parse(storeData);
     res.setHeader('content-Type' ,'text/html');
     var parsedData = qs.parse(storeData);
     res.write(`<h2>${parsedData.name}</h2>`)
     res.write(`<h3>${parsedData.email}</h3>`)
     res.write(`<p>${parsedData.age}</p>`)
 }
 })
}

server.listen(5678, () => {
    console.log('server is running on port 5678');

})