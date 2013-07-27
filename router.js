exports.route = function (app) {
    app.all('/', require('./views/index').index);
    app.all('/questions', require('./views/questions/index').index);
    //app.get('/question/:questionId', question.question);
};