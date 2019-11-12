var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var util = require('util')
var cookieParser = require('cookie-parser') 
var cookie = require('cookie')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var username = {}

app.get('/', function(req, res){
  if(req.cookies.username){
    res.sendFile(__dirname + '/index.html');
  }else{
    res.sendFile(__dirname + '/login.html')
  }
});

//TODO: Make Cookies temporary
app.post('/register', (req, res) => {
  console.log(req.body)
  res.cookie('username', req.body.username)
  res.sendFile(__dirname + '/index.html')
})

app.get('/index.js', function(req, res){
  res.sendFile(__dirname + '/index.js');
});

app.get('/stylesheet.css', function(req, res){
  res.sendFile(__dirname + '/stylesheet.css');
});

app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/socket.io/socket.io.js');
});


io.on('connection', function(socket){
  username[socket.id] = cookie.parse(socket.handshake.headers.cookie).username
  console.log(username[socket.id] + ' has connected');
  updateUsers()

  socket.once("disconnect", function(){
    console.log(username[socket.id] + " disconnected");
    updateUsers()
  }); 

  socket.on("chat message", function(msg){
    console.log(username[socket.id] + ": " + msg);
    io.emit("chat message", username[socket.id] + ': ' + msg);
  });
});

function updateUsers(){
  var users = []
  for(key in io.sockets.connected){
    if(username[key] != null){
      users.push(username[key])
    }
  }
  io.emit('user_list', users)
}

http.listen(3000, function(){
  console.log('Listening on *:3000');
});