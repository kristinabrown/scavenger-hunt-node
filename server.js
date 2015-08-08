//require the libraries
const http     = require('http');
const express  = require('express');
const socketIo = require('socket.io');
const redis    = require('redis');

//instantiate the app as an instance of express
const app      = express();
var url = require('url');

//SERVER

var port = process.env.PORT || 3001;
var redisURL = "redis://h:p592ursm7337vt19fo7j5l070e6@ec2-54-83-57-64.compute-1.amazonaws.com:11999";
var redisClient = redis.createClient();
// redisClient.auth(redisURL.auth.split(":")[1]);

//set the port if not evironmental port exists

//initialize the server - pass the express app to the http module and have it listen to the port
var server = http.createServer(app)
                 .listen(port, function(){
                    console.log('Listening on port '+ port +'.');
                  });

//initiate socket io using the server instance
const io       = socketIo(server);

//set the redis subscription to method from Rails app
// var redisClient = redis.createClient();
redisClient.subscribe('update');

//set the io connection
io.on('connection', function(socket){

  redisClient.on('message', function(channel, message){
    io.sockets.emit('message', message)
  });

});