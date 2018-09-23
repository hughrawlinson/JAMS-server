module.exports = function(request, reply){
  var db = require('../database.js')(function(err,db){
    // TODO: Validate id, throw 400
    db.findOne({id:request.params.id},function(err,data){
      if(err){
         console.log(err);
        // TODO: Check if this is meant to be a 404//5XX
        reply({status:500});
      }
      else{
        if(!data){
          reply({status:404});
        }
        else{
          reply(data.data);
        }
      }
    });
  });
};
