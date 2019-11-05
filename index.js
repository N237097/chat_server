$(function () {
    var socket = io();
    var username = prompt("Please type in your username");
    socket.emit(username);

    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    
    socket.on("chat message", function(msg){
      $('#messages').append($('<li>').text(msg));
    });

  });