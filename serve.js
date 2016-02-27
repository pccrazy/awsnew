#!/usr/bin/env node
'use strict';

var express    = require("express");
var bodyParser = require('body-parser');
require('events').EventEmitter.defaultMaxListeners = Infinity;
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //support encoded bodies


require('./Sql')();
 var https = require('https')
  , port = process.argv[2] || 4443
  , fs = require('fs')
  , path = require('path')
  , server
  , options;

require('ssl-root-cas').inject().addFile(path.join(__dirname, 'server', 'my-private-root-ca.crt.pem'));

options = { key: fs.readFileSync(path.join(__dirname, 'server', 'my-server.key.pem'))
           ,cert: fs.readFileSync(path.join(__dirname, 'server', 'my-server.crt.pem')) };


  app.post("/query",function(req,res){
       console.log(req.body.Query);
       handle_database(req,res);
  });

server = https.createServer(options, app).listen(port, function () {
  // port = server.address().port;
  console.log('Listening on https://127.0.0.1:' + port);
  console.log('Listening on https://' + server.address().address + ':' + port);
  // console.log('Listening on https://local.ldsconnect.org:' + port);

});
