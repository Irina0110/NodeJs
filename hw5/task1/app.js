const http = require('http');
const fs = require('fs');
const path = require('path');
let mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
};
const file1 = "ajax.html";
http.createServer((req, res) => {
    if(req.method == 'GET' && (req.url == '/' || req.url == '/style.css')){
        let pathname;
        console.log("Request: " + req.url);
        if (req.url === '/')
            pathname = 'index.html';
        else
            pathname = '.' + req.url;

        fs.readFile(pathname, 'utf8', (err, data)=>{
            if(err){
                res.statusCode = 500;
                return res.end();
            }
            console.log(`The file ${pathname} is read and sent to the client\n`);
            res.writeHead(200, {
                'Content-Type': mimeTypes[path.extname(pathname)]
            });
            res.end(data);
        });
    }
    else if (req.method == 'GET' && req.url ==='/data'){
        console.log(`The file ${file1} is read and sent to the client\n`);
        fs.readFile(file1, 'utf-8', (err, data)=>{
            console.log("add", data)
            if(err){
                res.statusCode = 500;
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data)

        })
    };
}).listen(8080, () => {
    console.log("HTTP server works in 8080 port!\n");
});