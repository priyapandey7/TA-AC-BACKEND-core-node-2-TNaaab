var http = require('http');
var fs = require(fs);
var server =http.createServer(handleRequest);
var usersPath = __dirname + '/users/'
function handleRequest(req,res) {
 var dataStrore ='';
 req.on('data',(chunk) => {
    dataStrore +=  chunk;
 })
 req.on('end',() =>{
     if (req.url === '/users' && req.method === 'POST'){
      var userName =   JSON.parse(dataStrore).username;
      fs.open(usersPath + userName +'.json', 'wx' ,(err, fd) =>{
          if (err) return console.log(err) ;
          console.log(fd);
      })
     }
 })
}

server.listen(3000,() =>{
    console.log('server is listen on port 3000');
});