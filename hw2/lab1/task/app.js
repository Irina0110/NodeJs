const http = require('http'); // подключение модуля http
const fs = require('fs'); // подключение модуля для работы с файлом
const files = ["header.html", 'body.html', 'footer.html'];
const server = http.createServer((req, res)=>{
    let result = '';
    function iterator(i){
        if (i == files.length){
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(result);
            res.end();
        } else {
            fs.readFile(files[i], 'utf-8', (err, data)=> {
                if (err) {
                    res.statusCode = 500;
                    res.end();
                } else {
                    result += data;
                    iterator(++i);
                }
            });
        }
    }
    iterator(0);
});
server.listen(8080);
