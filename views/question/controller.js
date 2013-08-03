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
            }
            else {
                if (!question) {
                    next(new Error('no question found by id'));
                    return;
                }

                var tags = question.tags;
                var count = 5; // ask one more cause we need to remove self
                // tries to find related questions with any of this question's tags
                req.db.findRelatedQuestions(tags, count, question_id, function (err, relatedQuestions) {
                    if (err) {
                        next(err);
                    } else {
                        req.db.close();
                        viewModel = {
                            question: util.decorateQuestionForDetailView(question),
                            relatedQuestions: util.decorateQuestionsForListView(relatedQuestions)
                        };
                        cache.put(cacheKey, viewModel, util.constants.cacheTime);
                        res.render('question/index.html', viewModel);
                    }
                });
            }            
        });
    }
    else {
        res.render('question/index.html', viewModel);
    }
};
