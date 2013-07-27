var DataProvider = require('../../dataProvider').DataProvider;
var util = require('../../util');

exports.index = function (req, res, next) {
    req.db = req.db || new DataProvider(util.constants.dbServer, util.constants.dbServerPort, util.constants.dbName);
    var viewModel = {};
    req.db.findLatestQuestions(8, function (err, latestQuestions) {
        if (err) {
            next(err);
        } else {
            req.db.findHottestQuestions(5, function (err, hottestQuestions) {
                if (err) {
                    next(err);
                } else {
                    req.db.close();
                    viewModel.latestQuestions = util.decorateQuestionsForListView(latestQuestions);
                    viewModel.hottestQuestions = util.decorateQuestionsForListView(hottestQuestions);
                    res.render('questions/index.html', viewModel);
                }
            });
        }
    });
};
