let user = require('./User')

console.log('userName:',user.sayHello())

let http = require('http');
let url = require('url');
let util = require('util')
const { runInNewContext } = require('vm');

let server = http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain;charset=utf-8");
    
    // console.log(req.orginalurl);
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(req);
    
    const myURL =new URL("http://"+req.headers.host+req.url);
    console.log(util.inspect(myURL));
    res.end(util.inspect(myURL));
    // res.end("hello");
    

})

server.listen(3000,"127.0.0.1",()=>{
    console.log("Server running , go to 127.0.0.1:3000")

})