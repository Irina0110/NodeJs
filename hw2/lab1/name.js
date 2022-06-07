const http = require('http'); // подключение модуля
/*const server = http.createServer((request, response) => { // вызов метода создания http сервера
    console.log("HTTP works!");
});*/
http.createServer((request, response) => { // вызов метода создания http сервера
    console.log("HTTP works!");
    /*response.writeHead(200, {'Content-Type':'text/html'});*/ //возвращаем страницу
    response.statusCode = 404; //отдаем ошибку
    /*response.write('<h1>Hello</h1>');*/
    response.end();
}).listen(8080);
/*
server.listen(8080);*/
