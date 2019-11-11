var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var util = require('util')

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.js', function(req, res){
  res.sendFile(__dirname + '/index.js');
});

app.get('/stylesheet.css', function(req, res){
  res.sendFile(__dirname + '/stylesheet.css');
});

app.get('/socket.io/socket.io.js', (req, res) => {
  res.send(__dirname + '/socket.io/socket.io.js');
});

var username = {}

io.on('connection', function(socket){
  socket.once("disconnect", function(){
    console.log(username[socket.id] + " disconnected");
  });

  //TODO Switch from socket.id to LocalStorage or Cookies 
  socket.on("username", function(user){
    console.log(user + ' has connected');
    username[socket.id] = user;
  })
  socket.on("chat message", function(msg){
    console.log(username[socket.id] + ": " + msg);
    io.emit("chat message", username[socket.id] + ': ' + msg);
  });
  socket.on('user_list', (msg) => {
    //console.log(io.sockets.connected)
    var users = []
    for(key in io.sockets.connected){
      users.push(username[key])
    }
    socket.emit('user_list', users)//util.inspect(io.sockets.connected))
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});