var DataProvider = require('../../dataProvider').DataProvider;
var cache = require('../../cacheProvider');
var util = require('../../util');

exports.index = function (req, res, next) {
    req.db = req.db || new DataProvider(util.constants.dbServer, util.constants.dbServerPort, util.constants.dbName);
    var cacheKey = 'viewModel_question_index';
    var viewModel = cache.get(cacheKey);
    if (!viewModel) {
        viewModel = {};
        if (!req.params.questionId) {
            next(new Error('question id is null'));
            return;
        }
        var question_id = req.db.createObjectId(req.params.questionId);
        if (!question_id) {
            next(new Error('question id is invalid'));
            return;
        }
        req.db.findQuestionById(question_id, function (err, question) {
            if (err) {
                next(err);
            } else {
                req.db.close();
                viewModel = {
                    question: question
                };
                cache.put(cacheKey, viewModel, util.constants.cacheTime);
                res.render('question/index.html', viewModel);
            }            
        });
    }
    else {
        res.render('quesition/index.html', viewModel);
    }
};
