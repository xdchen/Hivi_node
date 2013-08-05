var moment = require('moment');
var sanitizer = require('sanitizer');

var toSummary = function (body, length) {
    if (body.length <= length) return body;
    var trimmed = body.substr(0, length);
    return trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' '))) + ' ...';
};

var toRelativeTime = function (date) {
    return moment(date).fromNow();
};

var toDateTime = function (date) {
    return moment(date).calendar();
};

var toUserProfileUrl = function (userId) {
    return "/user/" + userId;
};

var toQuestionUrl = function (questionId) {
    return "/question/" + questionId;
};

var toPostAnswerUrl = function (questionId) {
    return "/question/" + questionId + '/answer';
};

var toPostCommentUrl = function (questionId) {
    return "/question/" + questionId + '/comment';
};

var toTagUrl = function(tag){
    return "/tags/" + encodeURI(tag);
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

exports.decorateQuestionComment = function (comment) {
    var newComment = {
        body: comment.body,
        author: comment.author,
        author_url: toUserProfileUrl(comment.author_id),
        created_date: toDateTime(comment.created_at)
    };
    return newComment;
};

exports.decorateQuestionsForListView = function (questions) {
    var results = [];
    for (var i = 0; i < questions.length; i++) {
        var question = decorateQuestionForListView(questions[i]);
        results.push(question);
    }
    return results;
};

exports.decorateQuestionForDetailView = function (question) {
    var author_id = question.author_id;
    if (author_id) {
        question.author_url = toUserProfileUrl(author_id);
    }

    var choice_type = question.choice_type;   
    if (choice_type) {
        switch (choice_type) {
            case 'Single': // raido button list   
                var choices = question.choices;
                if (choices && choices.length > 1) {
                    var featuredChoice = choices[0];
                    for (var i = 1; i < choices.length; i++) {
                        if (choices[i].count > featuredChoice.count)
                            featuredChoice = choices[i];
                    }
                    question.featuredChoice = featuredChoice;
                }
                else
                    throw new Error('single choice question must have more than one choice');
                break;

            default:
                throw new Error('not implemented');
                break;
        }
    }

    var tags = question.tags;
    if (tags) {
        var newTags = [];
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            var newTag = {
                tag_url : toTagUrl(tag),
                tag: tag
            };
            newTags.push(newTag);
        }
        question.tags = newTags;
    }

    var comments = question.comments;
    if (comments) {
        var newComments = [];
        for (var i = 0; i < comments.length; i++) {
            newComments.push(exports.decorateQuestionComment(comments[i]));
        }
        question.comments = newComments;        
    }

    var question_id = question._id.toString();
    if (question_id) {
        question.url = toQuestionUrl(question_id);
        question.postAnswerUrl = toPostAnswerUrl(question_id);
        question.postCommentUrl = toPostCommentUrl(question_id);
    }

    return question;
};

exports.filterProfanity = function (input) {
    var safeInput = sanitizer.escape(input);
    return safeInput;
};

exports.constants = {
    dbServer: 'localhost',
    dbServerPort: 27017,
    dbName: 'hivinate',
    cacheTime: 5 // 5 minutes
};