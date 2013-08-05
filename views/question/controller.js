var async = require('async');
var DataProvider = require('../../dataProvider').DataProvider;
var cache = require('../../cacheProvider');
var util = require('../../util');

exports.index = function (req, res, next) {
    req.db = req.db || new DataProvider(util.constants.dbServer, util.constants.dbServerPort, util.constants.dbName);
    if (!req.params.questionId) {
        next(new Error('question id is null'));
        return;
    }

    var cacheKey = 'viewModel_question_index_' + req.params.questionId;
    var viewModel = cache.get(cacheKey);
    if (viewModel) {
        res.render('question/index.html', viewModel);
        return;
    }    

    var question_id = req.db.createObjectId(req.params.questionId);
    if (!question_id) {
        next(new Error('question id is invalid'));
        return;
    }

    var question, relatedQuestions;
    async.waterfall([
        function (callback) {
            req.db.findQuestionById(question_id, callback);
        },
        function (arg, callback) {
            question = arg;
            if (!question) {
                callback(new Error('no question found by id'));
                return;
            }
            
            var tags = question.tags;
            var count = 5;
            req.db.findRelatedQuestions(tags, count, question_id, callback);
        }
    ], function (err, result) {
        req.db.close();

        if (err) {
            next(err)
            return;
        }

        relatedQuestions = result;

        try{
            viewModel = {
                question: util.decorateQuestionForDetailView(question),
                relatedQuestions: util.decorateQuestionsForListView(relatedQuestions)
            };
        }
        catch (err) {
            next(err)
            return;
        }

        cache.put(cacheKey, viewModel, util.constants.cacheTime);
        res.render('question/index.html', viewModel);
    });    
};
