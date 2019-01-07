$(window).resize(function () {
  var h = $(window).height(),
    offsetTop = 125; // Calculate the top offset

  $('#map_canvas').css('height', (h - offsetTop));
}).resize();

$(document).ready(function(){

    // Existing JS
    $('#loadOverlay').fadeOut('slow');

    $('#showNews').on('click', function(){
      $('#allNews').show(100);
      $('#showNews').hide();
      $('#lessNews').show();
    });

    $('#lessNews').on('click', function(){
      $('#allNews').hide(100)
      $('#lessNews').hide()
      $('#showNews').show();
    });
    

    // function modalPop(data) {
    //   $('#locationModal').modal(data)
    // }
    
    
});
