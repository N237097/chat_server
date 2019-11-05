var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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
  console.log('a user connected');
  socket.on("disconnect", function(){
    console.log("Lappen disconnected");
  });
  socket.on("username", function(user){
    username[socket.id] = user;
  })
  socket.on("chat message", function(msg){
    console.log(username[socket.id] + ": " + msg);
    io.emit("chat message", username[socket.id] + ': ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});