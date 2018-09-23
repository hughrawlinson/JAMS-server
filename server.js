#!/usr/bin/env node

global.DB_URI = "";

(function(){
  // node-getopt oneline example.
  opt = require('node-getopt').create([
    ['d', '='                    ,'database connect string'],
    ['p', '='                    ,'port'],
    ['h', 'help'                 ,'display this help']
  ])              // create Getopt instance
  .bindHelp()     // bind option 'help' to default action
  .parseSystem(); // parse command line

  var Hapi = require('hapi');

  var server = new Hapi.Server();
  server.connection({ port: opt.options.p });
  DB_URI = opt.options.d;

  // Use connect method to connect to the Server
  server.route({
    method: 'PUT',
    path: '/jams',
    handler: require('./lib/handlers/put_jams')
  });

  server.route({
    method: 'GET',
    path: '/jams/{id}',
    handler: require('./lib/handlers/get_individual_jams')
  });

  server.route({
    method: 'GET',
    path: '/jams',
    handler: require('./lib/handlers/get_jams_id_list')
  });

  server.route({
    method:'GET',
    path: '/',
    handler: function(request, reply){
      reply("yes hello");
    }
  })

  server.start(function(){console.log('server started');});
})();
