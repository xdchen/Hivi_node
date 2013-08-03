exports.route = function (app) {
    app.all('/', require('./views/controller').index);
    app.all('/questions', require('./views/questions/controller').index);
    app.get('/question/:questionId', require('./views/question/controller').index);
};