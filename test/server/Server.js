let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');
const { runInNewContext } = require('vm');

let server = http.createServer((req,res)=>{
    // res.statusCode=200;
    // res.setHeader("Content-Type","text/plain;charset=utf-8");
    var pathname = req.url;
    fs.readFile(pathname.substring(1),function(err,data){
        if(err){
            res.writeHead(404,{
                'Content-Type':'text/html'
            });
        }else{
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.write(data.toString());
        }
        res.end();
    })
    // console.log(req.orginalurl);
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(req);
    
    // const myURL =new URL("http://"+req.headers.host+req.url);
    // console.log(util.inspect(myURL));
    // res.end(util.inspect(myURL));
    // res.end("hello");
})

server.listen(3000,"127.0.0.1",()=>{
    console.log("Server running , go to 127.0.0.1:3000")
})