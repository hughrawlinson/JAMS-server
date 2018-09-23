module.exports = function(request, reply){
  var db = require('../database.js')(function(err,db){
    db.insert(request.payload,function(err,data){
      if(err){
        reply({status:500});
      }
      else{
        reply({jams:data});
      }
    });
  });
};
