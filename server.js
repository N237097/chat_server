var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.js', function(req, res){
  res.sendFile(__dirname + '/index.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("disconnect", function(){
    console.log("Lappen disconnected");
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});