(function(){
  var Cloudant = require('cloudant')(process.env.DB_URI);
  module.exports = function(cb){
    Cloudant.db.list(function(err,list){
      if(err){
        console.log(err);
        throw err;
      }
      else{
        if(list.indexOf('jams') == -1){
          Cloudant.db.create('jams',function(){
            attachAPI(Cloudant.use('jams'));
          });
        }
        else{
          attachAPI(Cloudant.use('jams'));
        }
      }
    });

    var attachAPI = function(db){
      cDatabase = {};
      cDatabase.findOne = function(query, callback){
        db.get(query.id,function(err,data){
          if(err && err.error === "not_found"){
            callback(null,null);
          }
          else{
            callback(err,data);
          }
        });
      };

      cDatabase.find = function(query, callback){
        db.list(function(err,data){
          callback(err,data);
        });
      };

      cDatabase.list = function(callback){
        db.list(function(err,data){
          if(data){
            var ids = [];
            data.rows.map(function(val){
              ids.push(val.id);
            });
            data = ids;
          }
          callback(err,data);
        });
      };

      cDatabase.insert = function(data, callback){
        db.insert(data,function(err,data){
          callback(err,data.id);
        });
      };

      cDatabase.close = function(){
        //no need to close cloudant
      };
      // cDatabase.upsert = function(data, callback){
      //   db.get({})
      // };
      cb(cDatabase);
    };
  };
})();
