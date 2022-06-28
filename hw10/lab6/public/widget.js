/*Создаём глобальную переменную wrgsv для хранения объекта с данными и методами
виджета*/
var wrgsv = {
    idBox: 'wrgsv', /*Идентификатор по умолчанию тега div в котором будет создан
виджет */
    url_get_data_widget: '//localhost/get_widget_data', /* url откуда запросить данные у
сервера для наполнения виджета */
    url_style: '//localhost/widget.css', /* url откуда запросить файл со стилями у сервера
для виджета */
    init: function() { /*функция инициализации виджета */
        if (document.getElementById(this.idBox)) { /*проверяем наличие в DOM элемента с
указанным идентификатором */
            this.addStyle(); /* Вызываем метода объекта виджета для загрузки файла со
стилями и применения его к документу*/
            let self = this; /* Сохраняем ссылку на объект виджета в переменную self*/
            let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            /* проверка для совместимости с ie (в ie XMLHttpRequest это XDomainRequest) */
            let xhr = new XHR(); /* Создаем объект для ajax запроса на сервер */
            xhr.open('GET', this.url_get_data_widget, true); /* настраиваем ajax запрос на
сервер: метод – GET, url - '//localhost/get_widget_data', true – асинхронный режим */
            xhr.onload = function() { /*вешаем обработчик загрузки данных от сервера */
                if (this.response) { /*проверяем доступны ли данные полученные от сервера
*/
                    self.addWidget(JSON.parse(this.response)); /* преобразовываем
полученные данные к JS объекту и передаём этот объект в метод виджета addWidget для
построения вёрстки виджета */
                }
            }
            xhr.onerror = function() { console.log('onerror '+this.status); } /* вешаем обработчик
ошибок получения данных от сервера */
            xhr.send(); /* отправляем запрос на сервер */
        } else {
            console.log('The specified block ID "'+id+'" is missing'); /* выводим сообщение об
отсутствие в DOM тега с указанным id */
        }
    },
    addStyle: function() { /* метод формирует тег link и вставляет его в документ */
        let style = document.createElement('link'); /* создаем тег <link> и сохраняем его в
переменную style */
        style.rel = 'stylesheet'; /* задаем атрибут rel у тега <link> */
        style.type = 'text/css'; /* задаем атрибут type у тега <link> */
        style.href = this.url_style; /* задаем атрибут href у тега <link> откуда загружать css
файл */
        document.head.appendChild(style); /* добавляем <link> тег в качестве последнего
элемента тега <head> документа */
    },
    addWidget: function(data) { /*метод формирует вёрстку виджета с учётом
переданных от сервера массива данных и вставляет его в контейнер для виджета */
        let a, li, ul = document.createElement('ul'); /* объявляем переменные и создаем тег
<ul> */
        for(let i = 0; i < data.length; i++){ /*для каждого объекта из массива данных с
сервера */
            li = document.createElement('li'); /*создаем тег <li> */
            a = document.createElement('a'); /*создаем тег <a> */
            a.setAttribute('href', data[i].href); /* устанавливаем атрибут href у тега <a> по
переданным с сервера данным */
            a.innerHTML = data[i].title; /* устанавливаем внутреннее содержимое у тега <a>
по переданным с сервера данным */
            a.onclick = this.changeLocation; /* устанавливаем обработчик при нажатии на тег
<a>, по которому произойдёт переход на указанную ссылку основного документа сайта */
            li.appendChild(a); /* добавляем тег <a> в тег <li> */
            ul.appendChild(li); /* добавляем тег <li> в тег <ul> */
        }
        document.getElementById(this.idBox).appendChild(ul); /*вставляем тег <ul> в
контейнер виджета */
    },
    changeLocation: function(e){
        e.preventDefault(); /* отмена действие браузера по нажатия на тег <a> */
        window.parent.location = this.href; /* перезагрузка основного окна с переходом по
указанной ссылке */
    }
};