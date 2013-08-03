var DataProvider = require('../dataProvider').DataProvider;
var cache = require('../cacheProvider');
var util = require('../util');

exports.index = function (req, res, next) {
    req.db = req.db || new DataProvider(util.constants.dbServer, util.constants.dbServerPort, util.constants.dbName);
    var cacheKey = 'viewModel_home_index';
    var viewModel = cache.get(cacheKey);
    if (!viewModel) {
        viewModel = {};
        req.db.findLatestQuestions(8, function (err, latestQuestions) {
            if (err) {
                next(err);
            }
            else {
                req.db.findHottestQuestions(5, function (err, hottestQuestions) {
                    if (err) {
                        next(err);
                    }
                    else {
                        req.db.close();
                        viewModel = {
                            latestQuestions: util.decorateQuestionsForListView(latestQuestions),
                            hottestQuestions: util.decorateQuestionsForListView(hottestQuestions)
                        };
                        cache.put(cacheKey, viewModel, util.constants.cacheTime);
                        res.render('index.html', viewModel);
                    }
                });
            }
        });
    }
    else {
        res.render('index.html', viewModel);
    }
};
