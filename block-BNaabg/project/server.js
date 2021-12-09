var http = require('http');
var fs = require('fs');
var server =http.createServer(handleRequest);
var url = require('url')
var usersPath = __dirname + '/users/'

function handleRequest(req,res) {
 var parsedUrl = url.parse(req.url, true) ;
 var dataStrore ='';
 req.on('data',(chunk) => {
    dataStrore +=  chunk;
 })
 req.on('end',() =>{
     if (req.url === '/users' && req.method === 'POST'){
      var userName =   JSON.parse(dataStrore).username;
      fs.open(usersPath + userName +'.json', 'wx' ,(err, fd) =>{
          if (err) return console.log(err) ;
        //   console.log(fd);
        fs.writeFile(fd, dataStrore, (err) => {
            if(err) return console.log(err);
            fs.close(fd ,()=>{
                res.end(`${userName} created successfully`)
            });
        })
      })
     }
     //
     if (parsedUrl.pathname === '/users' && req.method === 'GET'){
        // console.log(parsedUrl);
        var username = parsedUrl.query.username;
        fs.readFile(usersPath + username + '.json',(err,content) =>{
        if(err) return console.log(err);
            res.setHeader('content-Type', 'application/json');
            res.end(content);
        })

     }
     if (parsedUrl.pathname === '/users' && req.method === 'PUT'){
        var username = parsedUrl.query.username;
        fs.open(usersPath + username + '.json', 'r+' ,(err,fd)=>{
            if(err) return console.log(err);
            fs.ftruncate(fd,(err)=>{
            if(err) return console.log(err);
            fs.writeFile(fd, dataStrore,(err)=>{
                if(err) return console.log(err);
                fs.close(fd ,()=>{
                    res.end(`${username} updated successfully`)
                });
            })
            })
        } )
     }
 })
}

server.listen(3000,() =>{
    console.log('server is listen on port 3000');
});