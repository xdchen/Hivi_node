var moment = require('moment');

var toSummary = function (body, length) {
    if (body.length <= length) return body;
    var trimmed = body.substr(0, length);
    return trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' '))) + ' ...';
};

var toRelativeTime = function (date) {
    return moment(date).fromNow();
};

var toUserProfileUrl = function (userId) {
    return "/user/" + userId;
};

var toQuestionUrl = function (questionId) {
    return "/question/" + questionId;
};

var decorateQuestionForListView = function (question) {
    var created = question.created_at;
    if (created) {
        question.relativeCreated = toRelativeTime(created);
    }

    var author_id = question.author_id;
    if (author_id) {
        question.author_url = toUserProfileUrl(author_id);
    }

    var body = question.body;
    if (body) {
        question.summary = toSummary(body, 100);
    }

    var question_id = question._id.toString();
    if (question_id) {
        question.url = toQuestionUrl(question_id);
    }
    return question;
};

exports.decorateQuestionsForListView = function (questions) {
    var results = [];
    for (var i = 0; i < questions.length; i++) {
        var question = decorateQuestionForListView(questions[i]);
        results.push(question);
    }
    return results;
};

exports.constants = {
    dbServer: 'localhost',
    dbServerPort: 27017,
    dbName: 'hivinate'
};