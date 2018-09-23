(function(){
  module.exports = {};

  var MongoClient = require('mongodb').MongoClient;
  var ObjectID = require('mongodb').ObjectID;

  module.exports = function(cb){
    MongoClient.connect(DB_URI, function(err, db) {
      if(err){
        console.error(err);
        process.exit();
      }

      var jams = db.collection('jams');

      var mongoConnection = {};

      mongoConnection.findOne = function(query, callback){
        jams.findOne({_id:ObjectID(query.id)},function(err,result){
          callback(err,result);
        });
      };

      mongoConnection.find = function(query, callback){
        jams.find(query).limit(30).toArray(function(err,result){
          callback(err,result);
        });
      };

      mongoConnection.insert = function(data, callback){
        jams.insertOne(data,function(err,result){
          callback(err,result.electionId);
        });
      };

      mongoConnection.list = function(callback){
        jams.find({},function(err,data){
          console.log(data);
          if(data){
            var ids = [];
            data.map(function(val){
              ids.push(val._id);
            });
            data = ids;
          }
          callback(err,data);
        });
      };

      mongoConnection.close = function(){
        db.close();
      };

      cb(mongoConnection);
    });
  };
})();
