// $(window).resize(function () {
//   var h = $(window).height(),
//     offsetTop = 125; // Calculate the top offset

//   $('#map_canvas').css('height', (h - offsetTop));
//   $('#area_content').css('height', (h - offsetTop - 100));
// }).resize();

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
    

    function modalPop(data) {
      $('#locationModal').modal(data)
    }



    // var locationScope = 'London'.toLowerCase();
    // var currentPinpoint = null;
    // var centerMark = null;
    // var districts = null;
    // var search_result = null;
    // var geocoder = new google.maps.Geocoder();

    // L.mapbox.accessToken = 'pk.eyJ1IjoicmVnaW5hZmNvbXB0b24iLCJhIjoiY2pxYnJxcGJ1MW53bTQybXQ5NWlqZWlnMyJ9.usfLqWOMKjLsr1jLxd78mg';

    // var map =  L.map('map_canvas', {
    //     center: [51.509865, -0.118092],
    //     zoom: 11,
    //     scrollWheelZoom: false,
    // });

    // var tiles = L.mapbox.tileLayer(
    // 'datamade.hn83a654', {
    //     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong>"
    // })
    // tiles.addTo(map);



    var infoBox = L.control({'position': 'topright'});

    infoBox.onAdd = function() {
        // this._div = L.DomUtil.create('div', 'infobox');
        // this.update();
        // return this._div;
    }

    infoBox.update = function(properties){
        // if(properties){
        //     var info = '<h4>' + properties.district + '</h4>';
        //     info += '<p>' + properties.council_member + '</p>';
        //     this._div.innerHTML = info;
        // }
    }

    infoBox.clear = function(){
      // this._div.innerHTML = '<h4>{{CITY_NAME_SHORT}} Council {{CITY_VOCAB.MUNICIPAL_DISTRICT}}s</h4><p><i class="fa fa-hand-pointer-o fa-fw"></i><span class="non-mobile-only">Hover</span><span class="mobile-only">Tap a ward</span> for details</p>';
      // this._div.innerHTML = ''
    }

    // infoBox.addTo(map);
    infoBox.clear();

    var customOptions =
        {
        'className' : 'custom'
        }
    function onEachFeature(feature, layer) {
        if (feature.properties) {

            var center = layer.getBounds().getCenter();

            if (map){
                layer.layerPopup = L.popup(customOptions, layer)
                                    .setLatLng(center)
                                    .setContent(feature.properties.popupContent);

                layer.on('click', function(e){
                    window.location = feature.properties.detail_link
                });

                layer.on('mouseover', function(e){
                    console.log(e.target.feature.properties)
                    infoBox.update(e.target.feature.properties);
                    e.target.setStyle({'fillOpacity': 0.6, 'color': "{{MAP_CONFIG.highlight_color}}"});
                });

                layer.on('mouseout', function(e){
                    infoBox.clear();
                    e.target.setStyle({'fillOpacity': 0.2, 'color': "{{MAP_CONFIG.color}}"});
                })

                layer.on('tableover', function(e){
                    infoBox.update(e.target.feature.properties);
                    e.target.setStyle({'fillOpacity': 0.6, 'color': "{{MAP_CONFIG.highlight_color}}"})
                });

                layer.on('tableout', function(e){
                    infoBox.clear();
                    map.closePopup(e.target.layerPopup);
                    e.target.setStyle({'fillOpacity': 0.2, 'color': "{{MAP_CONFIG.color}}"});
                });
            }
        }
    }

   



    function doSearch() {
//         clearSearch();
//         var address = $("#search-address").val();

//         if (address != "") {
//           // $("#reset").show()
//           if (address.toLowerCase().indexOf(locationScope) == -1)
//             address = address + " " + locationScope;

//           geocoder.geocode( { 'address': address}, function(results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//               currentPinpoint = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
//               $.address.parameter('address', encodeURIComponent(address));
//               centerMark = new L.Marker(currentPinpoint, { icon: (new L.Icon({
//                 iconUrl: "assets/push_pin.png",
//                 iconSize: [32, 32],
//                 iconAnchor: [10, 32]
//               }))}).addTo(map);

              
// var RADIUS = 3050;
// var filterCircle = L.circle(currentPinpoint, RADIUS, {
//     opacity: 1,
//     weight: 1,
//     fillOpacity: 0.4
// }).addTo(map);

// var latlng = L.latLng(currentPinpoint[0], currentPinpoint[1]);



//     // Add points to map
//     $.getJSON("assets/americanhandelsociety_map.geojson",function(data){
//         districts = L.mapbox.featureLayer(data)


//         districts.setFilter(function showLocations(feature) {
//             return latlng.distanceTo(L.latLng(
//                     feature.geometry.coordinates[1],
//                     feature.geometry.coordinates[0])) < RADIUS
//         });

//         districts.addTo(map);
//     });


//             }
//             else {
//               alert("We could not find your address: " + status);
//             }
//           });
//         }
//         else { //search without geocoding callback
//           // map.fitBounds(districts.getBounds());
//         }
    }

    function clearSearch(){

        // if (search_result)
        //   map.removeLayer(search_result);
        // if (centerMark)
        //   map.removeLayer(centerMark);

        // council_member_table.search('').draw();
    }

    function findMe() {
        // Try W3C Geolocation (Preferred)
        var foundLocation;

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            foundLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            addrFromLatLng(foundLocation);
            }, null);
        }
        else {
            alert("Sorry, we could not find your location.");
        }
    }

    function addrFromLatLng(latLngPoint) {
        geocoder.geocode({'latLng': latLngPoint}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              $('#search_address').val(results[1].formatted_address);
              $('.hint').focus();
              doSearch();
            }
          } else {
            alert("Geocoder failed due to: " + status);
          }
        });
    }

    //converts a slug or query string in to readable text
    function convertToPlainString(text) {
        if (text == undefined) return '';
        return decodeURIComponent(text);
    }

    function initialize(){
        $("#search-address").val(convertToPlainString($.address.parameter('address')));

        if ($("#search-address").val() != "") {
            doSearch();
        }
        else {

            // districts.addTo(map);
            // map.fitBounds(districts.getBounds());
        //     $("#reset").hide()
        }
    }

    // $(function() {
        initialize();

        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-address'));

        $("#btnSearch").on("click", function() {
            doSearch();
        });

        $('#reset').click(function(){
            $.address.parameter('address','');
            clearSearch();
            initialize();
            return false;
        });

        $("#search_address").keydown(function(e){
          var key =  e.keyCode ? e.keyCode : e.which;
          if(key == 13) {
              $('#btn_search').click();
              return false;
          }
        });
    
});
