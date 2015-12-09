(function(){
  var Hapi = require('hapi');
  var MongoClient = require('mongodb').MongoClient;


  // Connection URL
  if(!process.env.MONGO_URI || !process.env.JAMS_PORT){
    console.error("Environmental config not properly specified");
    process.exit();
  }

  var server = new Hapi.Server();
  server.connection({ port: process.env.JAMS_PORT });

  // Use connect method to connect to the Server
  MongoClient.connect(process.env.MONGO_URI, function(err, db) {
    if(err){
      console.error(err);
      process.exit();
    }

    var jams = db.collection('jams');

    var insert = function(request,rb){
      jams.insert(request.body,function(err,result){
        if(err){
          console.error('failed to insert jam '+request.body.file_metadata.identifiers.filename);
          rb({status:'500'});
        }
        else{
          rb({status:'ok'});
        }
      });
    }

    server.route({
      method: 'PUT',
      path: '/jams',
      handler: function (request, reply) {
        insert(request,function(rb){
          return rb;
        });
      }
    });

    server.start(function () {
      console.log('Server running at:', server.info.uri);
    });


    process.on('exit',function(){
      db.close();
    });
  });
})();
