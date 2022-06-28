const express = require('express'); /* подключаем модуль express */
const data = require('./data.json'); /* подключаем файл с данными для виджета */
const app = express(); /* создаем экземпляр приложения express */
app.use(express.static('public')); /* настраиваем экспресс на отдачу статического контента из
папки public */
app.get('/get_widget_data', function(req, res, next){ /* регистрируем обработчик для запросов
пришедших по url /get_widget_data */
    let arr = []; /* формируем массив данных для отправки виджету */
    arr.push(data[Math.floor(Math.random()*data.length)]); /* добавляем случайный
элемент из источника данных для виджета */
    arr.push(data[Math.floor(Math.random()*data.length)]);
    arr.push(data[Math.floor(Math.random()*data.length)]);
    res.send(arr); /* отправляем данные виджету */
});
app.listen(80); /*настраиваем приложение слушать 80 порт*/