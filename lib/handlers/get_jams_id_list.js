module.exports = function(request, reply){
  require('../database.js')(function(err,db){
    if(err){
      throw err;
    }
    else{
      db.list(function(err,data){
        if(err){
          reply({status:500});
        }
        else{
          reply({jams:data});
        }
      });
    }
  });
};
