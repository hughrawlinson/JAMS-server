#!/usr/bin/env node

(function(){
  var Hapi = require('hapi');
  var MongoClient = require('mongodb').MongoClient;
  var ObjectID = require('mongodb').ObjectID;


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

    server.route({
      method: 'PUT',
      path: '/jams',
      handler: function (request, reply) {
        var payload = {
          data: request.payload
        };
        jams.insertOne(payload,function(err,result){
          if(err){
            console.error('failed to insert jam '+request.body.file_metadata.identifiers.filename);
            reply({status:'500'});
          }
          else{
            var r = JSON.parse(result);
            return reply({
              id:r.electionId,
            });
          }
        });
      }
    });

    server.route({
      method: 'GET',
      path: '/jams/{id}',
      handler: function(request, reply){
        // TODO: Validate id, throw 400
        jams.findOne({_id:ObjectID(request.params.id)},function(err,result){
          if(err){
            // TODO: Check if this is meant to be a 404//5XX
            reply({status:500});
          }
          else{
            if(!result){
              reply({status:404});
            }
            reply(result.data);
          }
        });
      }
    });

    server.route({
      method: 'GET',
      path: '/jams',
      handler: function(request, reply){
        jams.find({}).limit(30).toArray(function(err,result){
          if(err){
            reply({status:500});
          }
          else{
            var ids = [];
            result.map(function(val){
              ids.push(val._id);
            });
            reply({jams:ids});
          }
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
