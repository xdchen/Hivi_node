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
    
    var question_id = req.db.createObjectId(req.params.questionId);
    if (!question_id) {
        next(new Error('question id is invalid'));
        return;
    }

    var cacheKey = 'viewModel_question_index_' + req.params.questionId;
    var viewModel = cache.get(cacheKey);

    var log_render_page = function (question_id, model) {
        res.render('question/index.html', model);
        async.waterfall([
            function (callback) {
                req.db.addQuestionViews(question_id, callback);
            }
        ], function (err, result) {
            req.db.close();
        });
    };

    if (viewModel) {
        log_render_page(question_id, viewModel);
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
        if (err) {
            req.db.close();
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
            req.db.close();
            next(err)
            return;
        }

        cache.put(cacheKey, viewModel, util.constants.cacheTime);
        log_render_page(question_id, viewModel);
    });    
};

exports.postComment = function (req, res, next) {
    req.db = req.db || new DataProvider(util.constants.dbServer, util.constants.dbServerPort, util.constants.dbName);
    
    if (!req.params.questionId) {
        next(new Error('question id is null'));
        return;
    }

    var question_id = req.db.createObjectId(req.params.questionId);
    if (!question_id) {
        next(new Error('question id is invalid'));
        return;
    }

    if (!req.body.comment) {
        next(new Error('no comment posted'));
        return;
    }

    var ObjectID = require('mongodb').ObjectID; // todo: remove this line when binding to current user id is done
    var comment = {
        author: 'richard', // todo: bind to current user name
        author_id: new ObjectID(), // todo: bind to current user id
        body: util.filterProfanity(req.body.comment),
        created_at: new Date()
    };    

    async.waterfall([
        function (callback) {
            req.db.postQuestionComments(comment, question_id, callback);
        }
    ], function (err, result) {
        req.db.close();
        if (err) {
            next(err);
            return;
        }

        var cacheKey = 'viewModel_question_index_' + req.params.questionId;
        cache.del(cacheKey);

        res.send(util.decorateQuestionComment(comment));        
    });
};
