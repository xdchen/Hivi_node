var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

DataProvider = function (host, port, database) {
    this.db = new Db(database, new Server(host, port), { w: 1 });
};

DataProvider.prototype.createObjectId = function (id) {
    var objectId = null;
    try{
        objectId = new ObjectID.createFromHexString(id);
    }
    catch(e){
    }
    return objectId;
};

DataProvider.prototype.getCollection = function (name, callback) {

    if (this.db.serverConfig.connected) {
        this.db.collection(name, function (err, collection) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, collection);
            }
        });
    }
    else {
        this.db.open(function (err, db) {
            if (err) {
                callback(err);
            }
            else {
                db.collection(name, function (err, collection) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, collection);
                    }
                });
            }
        });
    }
};

DataProvider.prototype.findQuestionById = function (id, callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(error);
        }
        else {
            collection.findOne({ _id: id }, function (err, result) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, result);
                }
            });
        }
    });
};
/*
DataProvider.prototype.findAllQuestions = function (callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
        }
        else {
            collection.find({}, { // exclude following fields
                author: 0,
                author_id: 0,
                created_at: 0,
                choice_type: 0,
                choices: 0,
                thumb: 0,
                tags: 0,
                views: 0,
                lastanswered_at: 0,
                comments: 0,
                results: 0
            }).toArray(function (err, results) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, results);
                }
            });
        }
    });
};
*/

DataProvider.prototype.findFeaturedQuestion = function (callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
        }
        else {
            collection.find({}, { // exclude following fields               
                created_at: 0,
                views: 0,
                lastanswered_at: 0,
                comments: 0
            })
            .sort([['lastanswered_at', -1]])
            .limit(1)
            .toArray(function (err, results) {
                if (err) {
                    callback(err);                    
                }
                else {
                    if (results.length < 1)
                        callback(null, null);
                    else
                        callback(null, results[0]);
                }
            });
        }
    });
};

DataProvider.prototype.findLatestQuestions = function (count, callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
        }
        else {
            collection.find({}, { // exclude following fields              
                choice_type: 0,
                choices: 0,                
                tags: 0,
                views: 0,
                answered: 0,
                lastanswered_at: 0,
                comments: 0,
                results: 0
            })
            .sort([['created_at', -1]])
            .limit(count)
            .toArray(function (err, results) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, results);
                }
            });
        }
    });
};

DataProvider.prototype.findHottestQuestions = function (count, callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
        }
        else {
            collection.find({}, { // exclude following fields
                author: 0,
                author_id: 0,
                created_at: 0,
                choice_type: 0,
                choices: 0,
                thumb: 0,
                tags: 0,
                views: 0,
                lastanswered_at: 0,
                comments: 0,
                results: 0
            })
            .sort([['answered', -1]])
            .limit(count)
            .toArray(function (err, results) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, results);
                }
            });
        }
    });
};

DataProvider.prototype.close = function () {
    this.db.close();
};

exports.DataProvider = DataProvider;