/*Переменная widgets хранит в себе массив виджетов с тестовым наполнением. Каждый виджет
представляется объектов с четырьмя свойствами: id – уникальный идентификатор виджета, name –
название виджета, price – стоимость виджета, desc – описание виджета*/
let widgets = [{
    id:1, name:'Test Widget №1', price:100000, desc:'Test description'
}, {
    id:2, name:'Test Widget №2', price:200000, desc:'Test description'
}, {
    id:3, name:'Test Widget №3', price:300000, desc:'Test description'
}, {
    id:4, name:'Test Widget №4', price:400000, desc:'Test description'
}, {
    id:5, name:'Test Widget №5', price:500000, desc:'Test description'
}, {
    id:6, name:'Test Widget №6', price:600000, desc:'Test description'
}, {
    id:7, name:'Test Widget №7', price:700000, desc:'Test description'
}];
/*
Экспортируем из модуля функцию find – позволяющую искать виджет в массиве widgets по
переданному в функцию идентификатору id, и возвращать найденный результат в качестве второго
аргумента переданной callback функции.
*/
exports.find = function(id, callback) {
    for (let i = 0; i < widgets.length; i++){
        if (id === widgets[i].id)
            return callback(null, widgets[i]);
    }
    callback(null, null); /*если ничего не найдено, то вызываем callback функцию с
аргументами, первый аргумент callback функции зарезервирован для возвращения ошибки */
};
/*
Экспортируем из модуля функцию findAll – возвращает массив со всеми виджетами в качестве
второго аргумента в функцию callback;
*/
exports.findAll = function(callback) {
    callback(null, widgets);
};
/*
Экспортируем из модуля функцию add – позволяющую в массив widgets добавить новый виджет по
переданным данным в переменной data. В переменной data должно быть три свойства name, price
и desc. После успешного добавления нового виджета в хранилище возвращается созданный объект
с идентификатором в качестве второго параметра функции callback.
*/
exports.add = function(data, callback){
    if(!(data && data.name && data.price)) //если не все заданы поля возвращаем ошибку
        return callback(new Error('Error data'));
    let index = widgets.length + 1; //Рассчитываем идентификатор нового виджета
    widgets[widgets.length] = {
        id:index,
        name:data.name,
        price:parseFloat(data.price) || 0,
        desc: data.desc || ""
    };
    callback(null, widgets[index]);
};
/*
Экспортируем из модуля функцию delete – позволяющую удалить в массиве widgets виджет по
переданному идентификатору. После успешного удаления виджета в хранилище возвращается
удаленный объект в качестве второго параметра функции callback.
*/
exports.delete = function(id, callback){
    for (let i = 0; i < widgets.length; i++){
        if (id === widgets[i].id)
            return callback(null, widgets.splice(i, 1));
    }
    callback(null, null); /*если не найден удаляемый элемент, то вызываем callback функцию с
аргументами, первый аргумент callback функции зарезервирован для возвращения ошибки */
};
