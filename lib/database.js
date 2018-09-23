(function(){
  module.exports = function(cb){
    var db = {};

    if(DB_URI.split(':')[0]=="mongodb"){
      require('./dbs/mongo')(function(database){
        cb(null,database);
      });
    }
    else{
      require('./dbs/cloudant')(function(database){
        cb(null,database);
      });
    }
  };
})();
