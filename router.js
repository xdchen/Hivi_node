exports.route = function (app) {
    // routes
    app.all('/', require('./views/controller').index);
    app.all('/questions', require('./views/questions/controller').index);  
    app.get('/question/:questionId', require('./views/question/controller').index);

    // redirect
    app.all('/question', function (req, res, next) { 
        res.redirect(301, '/questions');
    });
};