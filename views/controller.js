var async = require('async');
var DataProvider = require('../dataProvider').DataProvider;
var cache = require('../cacheProvider');
var util = require('../util');

exports.index = function (req, res, next) {
    req.db = req.db || new DataProvider(util.constants.dbServer, util.constants.dbServerPort, util.constants.dbName);
    var cacheKey = 'viewModel_home_index';
    var viewModel = cache.get(cacheKey);
    if (viewModel) {
        res.render('index.html', viewModel);
        return;
    }

    var latestQuestions, hottestQuestions;
    async.waterfall([
        function (callback) {
            req.db.findLatestQuestions(8, callback);
        },
        function (arg, callback) {
            latestQuestions = arg;
            req.db.findHottestQuestions(5, callback);
        }
    ], function (err, result) {
        req.db.close();

        if (err) {
            next(err);
            return;
        }

        hottestQuestions = result;
        
        try{
            viewModel = {
                latestQuestions: util.decorateQuestionsForListView(latestQuestions),
                hottestQuestions: util.decorateQuestionsForListView(hottestQuestions)
            };
        }
        catch (err) {
            next(err)
            return;
        }

        cache.put(cacheKey, viewModel, util.constants.cacheTime);
        res.render('index.html', viewModel);
    });    
};
