$(document).ready(function() {
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
    
    function modalPop(data) {
      console.log("clickeddddd")
      $('#locationModal').modal(data)
    }
});
