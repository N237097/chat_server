$(function () {
    var socket = io();

    //TODO: Check if message is empty
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
        console.log('should stick')
        $('#messages').append($('<li>').text(msg));
        $(window).scrollTop($(document).height()-$(window).height())
      }else{
        console.log('should not stick')
        $('#messages').append($('<li>').text(msg));
        $(window).scrollTop(tempScroll)
      }
      
      console.log($(window).scrollTop())
      console.log($(document).height()-$(window).height())
    });
    
  });