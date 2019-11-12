$(function () {
    var socket = io();

    //TODO: Check if message is 'spam' (e.g. empty spaces)
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading when form is submitted
      if($('#m').val()){
        socket.emit('chat message', $('#m').val());
        socket.emit('user_list')
        $('#m').val('');
      }
      return false;
    });

    socket.on('user_list', (msg) => {
      $('.names').empty()
      for(var i=0; i < msg.length; i++){
        $('.names').append($('<li>').text(msg[i]))
      }
    })
    socket.on("chat message", function(msg){
      var tempScroll = $(window).scrollTop()
      if(tempScroll+1 >= $(document).height()-$(window).height()){
        $('#messages').append($('<li>').text(msg));
        $(window).scrollTop($(document).height()-$(window).height())
      }else{
        $('#messages').append($('<li>').text(msg));
        $(window).scrollTop(tempScroll)
      }
    });
  });