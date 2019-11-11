$(function () {
    var socket = io();
    var username = prompt("Please type in your username");
    socket.emit('username', username);

    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      socket.emit('user_list')
      $('#m').val('');
      return false;
    });

    socket.on('user_list', (msg) => {
      console.log(msg)
      $('#names').empty()
      for(var i=0; i < msg.length; i++){
        console.log('in loop')
        $('#names').append($('<li>').text(msg[i]))
      }
    })
    socket.on("chat message", function(msg){
      $('#messages').append($('<li>').text(msg));
    });

  });