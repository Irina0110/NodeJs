let express = require('express');
let cookieParser = require('cookie-parser'); //подключаем парсер заголовков с cookies
let logger = require('morgan'); //подключаем модуль логирования в консоль запросов
let mustacheExpress = require('mustache-express'); //подключаем шаблонизатор
let bodyParser = require('body-parser'); //подключаем парсер тела запросов
let session = require('express-session'); //подключаем модуль для организации сессии
let passport = require('passport'); //подключаем модуль passport
let app = express();
//подключаем модуль роутера по работе с панелью администратора
let adminRout = require('./routes/admin.js');
//регистрируем модуль шаблонизации Mustache в Express
app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
//регистрируем модуль логгера
app.use(logger('dev'));
//регистрируем модуль парсера тела запросов в котором хранится JSON строка
app.use(bodyParser.json());
//регистрируем модуль парсера тела POST запросов
app.use(bodyParser.urlencoded({ extended: false }));
//регистрируем парсер заголовков с cookies
app.use(cookieParser());
//регистрируем модуль сессии
app.use(session({
    secret: 'keyboard cat', //подпись сессионной cookie
    name: 'sid', //имя сессионной cookie
    cookie: { httpOnly: true, maxAge: 60000}, //настройка cookie, в частности время жизни 1 мин
    resave: true, //на всякий случай, используется для хранилищ без функции touch
    saveUninitialized: true //сохранение объекта сессии в память
}));
//подключаем статический сервер на папку public
app.use(express.static('public'));
//подключаем и запускаем настройку модуля passport
require('./authentication/init.js')();
app.use(passport.initialize()); //регистрируем паспорт
app.use(passport.session()); //регистрируем сессию паспорта
//регистрируем роутер по пути: /admin
app.use('/admin', adminRout);
app.listen(8000);