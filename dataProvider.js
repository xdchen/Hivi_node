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
    try {
        objectId = new ObjectID.createFromHexString(id);
    }
    catch (e) {
    }
    return objectId;
};

DataProvider.prototype.getCollection = function (name, callback) {
    if (this.db.serverConfig.connected) {
        // already connected
        this.db.collection(name, function (err, collection) {
            err ? callback(err) : callback(null, collection);
        });
        return;
    }
    
    // not connected
    this.db.open(function (err, db) {
        if (err) {
            callback(err);
            return;
        }
        
        db.collection(name, function (err, collection) {
            err ? callback(err) : callback(null, collection);
        });        
    });    
};

// ---- questions ---- //
DataProvider.prototype.findQuestionById = function (id, callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
            return;
        }
        
        collection.findOne({ _id: id }, { // exclude following fields
            created_at: 0,
            views: 0,
            lastanswered_at: 0,
            results: 0,
            version: 0
        }, function (err, question) {
            err ? callback(err) : callback(null, question);
        });        
    });
};

DataProvider.prototype.findFeaturedQuestion = function (callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
            return;
        }
        
        collection.find({}, { // exclude following fields               
            created_at: 0,
            tags: 0,
            views: 0,
            lastanswered_at: 0,
            comments: 0,
            results: 0,
            version: 0
        })
        .sort([['lastanswered_at', -1], ['answered', -1]])
        .limit(1)
        .toArray(function (err, results) {
            err || results.length < 1 ? callback(err) : callback(null, results[0]);
        });        
    });
};

DataProvider.prototype.findLatestQuestions = function (count, callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
            return;
        }

        collection.find({}, { // exclude following fields              
            choice_type: 0,
            choices: 0,
            tags: 0,
            views: 0,
            answered: 0,
            lastanswered_at: 0,
            comments: 0,
            results: 0,
            version: 0
        })
        .sort([['created_at', -1]])
        .limit(count)
        .toArray(function (err, results) {
            err ? callback(err) : callback(null, results);            
        });        
    });
};

DataProvider.prototype.findHottestQuestions = function (count, callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
            return;
        }
        
        collection.find({}, { // exclude following fields                
            choice_type: 0,
            choices: 0,
            tags: 0,
            views: 0,
            lastanswered_at: 0,
            comments: 0,
            results: 0,
            version: 0
        })
        .sort([['answered', -1]])
        .limit(count)
        .toArray(function (err, results) {
            err ? callback(err) : callback(null, results);            
        });        
    });
};

DataProvider.prototype.findRelatedQuestions = function (tags, count, question_id, callback) {
    this.getCollection('questions', function (err, collection) {
        if (err) {
            callback(err);
            return;
        }
      
        collection.find({ tags: { $in: tags }, _id: { $ne: question_id } }, { // exclude following fields
            choice_type: 0,
            choices: 0,
            tags: 0,
            views: 0,
            lastanswered_at: 0,
            comments: 0,
            results: 0,
            version: 0
        })
        .sort([['answered', -1]])
        .limit(count)
        .toArray(function (err, results) {
            err ? callback(err) : callback(null, results);
        });        
    });
};
// ---- end questions ---- //


DataProvider.prototype.close = function () {
    this.db.close();
};

exports.DataProvider = DataProvider;