var http = require('http');

var queryString = require('querystring')
const { type } = require('os');

var server = http.createServer(handleRequest);
 
function handleRequest(req,res) {
   var dataFormate = req.headers['content-type'];
    var store ='';

    req.on('data',(chunk)=>{
    store = store = chunk;
    });

    req.on('end',() => {
        if(dataFormate === 'application/json') {
            var parsedData = JSON.parse(store)
            res.end(store);
        }
        if(dataFormate ==='application/x-www-form-urlencoed') {
           var  parsedData = queryString.parse(store);
           res.end(JSON.stringify (parsedData));
        }
    })
}

server.listen(7000,()=> {
 console.log('server is listnig on port 7000');
});
