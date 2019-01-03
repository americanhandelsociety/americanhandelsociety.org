// $(window).resize(function () {
//   var h = $(window).height(),
//     offsetTop = 125; // Calculate the top offset

//   $('#map_canvas').css('height', (h - offsetTop));
//   $('#area_content').css('height', (h - offsetTop - 100));
// }).resize();

// $(document).ready(function(){

//     // Existing JS
//     $('#loadOverlay').fadeOut('slow');

//     $('#showNews').on('click', function(){
//       $('#allNews').show(100);
//       $('#showNews').hide();
//       $('#lessNews').show();
//     });

//     $('#lessNews').on('click', function(){
//       $('#allNews').hide(100)
//       $('#lessNews').hide()
//       $('#showNews').show();
//     });
    


//     function modalPop(data) {
//       $('#locationModal').modal(data)
//     }



// // Map!


//     L.mapbox.accessToken = 'pk.eyJ1IjoicmVnaW5hZmNvbXB0b24iLCJhIjoiY2pxYnJxcGJ1MW53bTQybXQ5NWlqZWlnMyJ9.usfLqWOMKjLsr1jLxd78mg';

//     var map =  L.map('map_canvas', {
//         center: [51.509865, -0.118092],
//         zoom: 11,
//         scrollWheelZoom: false,
//     });

//     var tiles = L.mapbox.tileLayer(
//     'datamade.hn83a654', {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong>"
//     })
//     tiles.addTo(map);

//     // Add points to map
//     $.getJSON("assets/americanhandelsociety_map.geojson",function(data){
//         chicago_boundary = L.geoJson(data, {
//             style: {opacity: 1, weight: 1, color: "#333", fillOpacity: 0}
//         });
//         chicago_boundary.addTo(map);
//     });








//     $("#btnSearch").on("click", function() {
//       console.log("aksdfjalsdkjf!")
//       doSearch();
//     });


//     // // Create nonvulnerable areas
//     // $.getJSON("data/processed/nonvulnerable_types.geojson",function(data){
//     //     $.each(data.features, function(idx, value) {
//     //         addToNonvulLayer(value, value.properties.PSQFT_BIN);
//     //     });
//     // });

//     // // Create vulnerable areas
//     // $.getJSON("data/processed/market_types.geojson",function(data){
//     //     $.each(data.features, function(idx, value) {
//     //         addToLayer(value, value.properties.PSQFT_BIN, value.properties.CHGE_BIN);
//     //     });

//     //     showMarketType("3"); //show high-cost by default
//     // });

//     // $('.market-type').on('click', function(e){
//     //     var index = $(e.target).data('market_index');

//     //     showMarketType(index)
//     // });

//     // $('.poi-type').on('click', function(e){
//     //     clearMap();
//     //     legend.updatePOI();
//     //     addNonvulLayers();
//     //     var index = $(e.target).data('poi');

//     //     poi_marker = L.marker(poi_list[index]).addTo(map);
//     //     map.setView(poi_list[index], 14)

//     //     $('#poi-' + index).show();
//     // });

//     // // Legend
//     // var legend = L.control({'position': 'bottomright'});

//     // legend.onAdd = function() {
//     //     this._div = L.DomUtil.create('div', 'infobox');
//     //     this.update(3);
//     //     return this._div;
//     // }

//     // legend.update = function(index){
//     //     var info = "<h4>Displacement Pressure in Chicago</h4>\
//     //         <strong>" + cost_map[index] + " areas</strong>\
//     //         <table class='table table-condensed'>\
//     //             <tbody>\
//     //                 <tr>\
//     //                     <td>Vulnerable<br />Significantly rising prices</td>\
//     //                     <td style='background:" + cluster_details[index][2]['fillColor'] + "; width: 40px;'></td>\
//     //                 </tr>\
//     //                 <tr>\
//     //                     <td>Vulnerable<br />Rising prices</td>\
//     //                     <td style='background:" + cluster_details[index][1]['fillColor'] + "; width: 40px;'></td>\
//     //                 </tr>\
//     //             </tbody>\
//     //         </table>";
//     //     this._div.innerHTML = info;
//     // }

//     // legend.updatePOI = function(){
//     //     this._div.innerHTML = "";
//     // }

//     // legend.addTo(map);

//     // // Infobox
//     // var infoBox = L.control({'position': 'bottomleft'});

//     // infoBox.onAdd = function() {
//     //     this._div = L.DomUtil.create('div', 'infobox');
//     //     this.update();
//     //     return this._div;
//     // }

//     // infoBox.update = function(properties){
//     //     if(properties){
//     //         var info = '';
//     //         if (properties['COMMUNITY_']) { // Vulnerable tracts
//     //             info = '<h3 class="infobox-h">' + properties['COMMUNITY_'] + '</h3>';
//     //             info += "<p><strong>Vulnerable<br />" 
//     //         }
//     //         else { // Non vulnerable tracts
//     //             info = '<h3 class="infobox-h">' + properties['COMMUNITY'] + '</h3>';
//     //             info += "<p><strong>" + vulnerable_map[properties['CLUSTER_ID']] + "<br />";
//     //         }
//     //         info += cost_map[properties['PSQFT_BIN']] + 
//     //                 "<br />" + change_map[properties['CHGE_BIN']] + "</strong><p>" +
//     //                 // Under $900
//     //                 "<div class='row md-font'><div class='col-md-8'>Gross rent under $900</div>" +
//     //                 "<div class='col-md-2 b-font'>" + Math.round(properties['HH_SHARE'] * 1000) / 10 + "%" + markInsufficientData(properties['HH_SHARE_I']) + "</div></div>" +
//     //                 // Section 8
//     //                 "<div class='row md-font'><div class='col-md-8'>Project-based Section 8</div>" + 
//     //                 "<div class='col-md-2 b-font'>" + Math.round(properties['SECTION8'] * 1000) / 10 + "%" + markInsufficientData(properties['SECTION8_I']) + "</div></div>" +
//     //                 // 2 to 4 unit buildings
//     //                 "<div class='row md-font'><div class='col-md-8'>2 to 4 unit buildings</div>" +
//     //                 "<div class='col-md-2 b-font'>" + Math.round(properties['SHARE_2_4'] * 1000) / 10 + "%" + "</div></div>" +
//     //                 // Non-white population
//     //                 "<div class='row md-font'><div class='col-md-8'>Non-white population</div>" + 
//     //                 "<div class='col-md-2 b-font'>" + Math.round(properties['NON_WHITE'] * 1000) / 10 + "%" + markInsufficientData(properties['NON_WHITE_']) + "</div></div>";

//     //         info += showInsuffientDataMsg(properties);

//     //         this._div.innerHTML = info;
//     //     }
//     // }

//     // infoBox.clear = function(){
//     //   this._div.innerHTML = '<p style="margin-bottom:0;">Hover over an area to learn more</p>';
//     // }

//     // infoBox.addTo(map);
//     // infoBox.clear();

//     // function showMarketType(index) {
//     //     $('.market-details').hide();

//     //     // Remove all layers except tiles
//     //     map.eachLayer(function (layer) {
//     //         if (!(layer instanceof L.TileLayer)) {
//     //             map.removeLayer(layer);
//     //         }
//     //     });

//     //     // Add relevant layer groups by evaluating string version of var names
//     //     map.addLayer(chicago_boundary);
//     //     map.addLayer(eval('vulLayer' + index));
//     //     legend.update(index);
//     //     // map.addLayer(eval('nonvulLayer' + index));

//     //     map.setView([41.87811, -87.66677], 11);
//     //     $('#cluster_' + index).show();
//     // }

//     // function onEachFeature(feature, layer) {
//     //     if (feature.properties) {
//     //         var center = layer.getBounds().getCenter();

//     //         layer.on('mouseover', function(e){
//     //             infoBox.update(e.target.feature.properties);
//     //         });

//     //         layer.on('click', function(e){
//     //             infoBox.update(e.target.feature.properties);
//     //         });

//     //         layer.on('mouseout', function(e){
//     //             infoBox.clear();
//     //         });
//     //     }
//     // };

//     // // Helper functions
//     // function addToLayer(value, psqft_bin, chge_bin) {
//     //     var geojsonLayer = L.geoJson(value, {
//     //         style: cluster_details[psqft_bin][chge_bin],
//     //         onEachFeature: onEachFeature,
//     //         smoothFactor: 0.1
//     //     });

//     //     if (psqft_bin == 1) {
//     //         vulLayer1.addLayer(geojsonLayer);
//     //     } else if (psqft_bin == 2) {
//     //         vulLayer2.addLayer(geojsonLayer);
//     //     } else {
//     //         vulLayer3.addLayer(geojsonLayer);
//     //     }
//     // };

//     // function addToNonvulLayer(value, psqft_bin) {
//     //     var geojsonLayer = L.geoJson(value, {
//     //         style: nonvulnerable_cluster_details[psqft_bin],
//     //         onEachFeature: onEachFeature,
//     //     });

//     //     if (psqft_bin == 1) {
//     //         nonvulLayer1.addLayer(geojsonLayer);
//     //     } else if (psqft_bin == 2) {
//     //         nonvulLayer2.addLayer(geojsonLayer);
//     //     } else {
//     //         nonvulLayer3.addLayer(geojsonLayer);
//     //     }
//     // };

//     // function clearMap(){
//     //     map.addLayer(vulLayer1);
//     //     map.addLayer(vulLayer2);
//     //     map.addLayer(vulLayer3);

//     //     $('.market-details').hide();
//     //     if (poi_marker) {
//     //         map.removeLayer(poi_marker);
//     //     }
//     // };

//     // function addNonvulLayers(){
//     //     map.addLayer(nonvulLayer1);
//     //     map.addLayer(nonvulLayer2);
//     //     map.addLayer(nonvulLayer3);
//     // };

//     // function removeNonvulLayers(){
//     //     map.removeLayer(nonvulLayer1);
//     //     map.removeLayer(nonvulLayer2);
//     //     map.removeLayer(nonvulLayer3);
//     // };

//     // function markInsufficientData(boolean){
//     //     if (boolean == 1) {
//     //         return '*'
//     //     } else {
//     //         return ''
//     //     }
//     // };

//     // function showInsuffientDataMsg(properties){
//     //     if (properties['HH_SHARE_I'] == 1 || properties['SECTION8_I'] == 1 || properties['NON_WHITE_'] == 1) {
//     //         return "<br /><div>* Data has high margin of error</div>";
//     //     } else {
//     //         return ""
//     //     }
//     // };
// });



$(document).ready(function(){



 var locationScope = 'London'.toLowerCase();
    var currentPinpoint = null;
    var centerMark = null;
    var districts = null;
    var search_result = null;
    var geocoder = new google.maps.Geocoder();

    // var map = L.map('map_canvas', {
    //     scrollWheelZoom: false,
    //     center: [51.509865, -0.118092],
    //     zoom: 11
    // });

    // var google_map_styles = [
    //     {
    //         stylers: [
    //             { saturation: -100 },
    //             { lightness: 40 }
    //         ]
    //     }
    // ];

    // var layer = new L.Google('ROADMAP', {mapOptions: {styles: google_map_styles}});
    // map.addLayer(layer);


    L.mapbox.accessToken = 'pk.eyJ1IjoicmVnaW5hZmNvbXB0b24iLCJhIjoiY2pxYnJxcGJ1MW53bTQybXQ5NWlqZWlnMyJ9.usfLqWOMKjLsr1jLxd78mg';

    var map =  L.map('map_canvas', {
        center: [51.509865, -0.118092],
        zoom: 11,
        scrollWheelZoom: false,
    });

    var tiles = L.mapbox.tileLayer(
    'datamade.hn83a654', {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong>"
    })
    tiles.addTo(map);



    var infoBox = L.control({'position': 'topright'});

    infoBox.onAdd = function() {
        this._div = L.DomUtil.create('div', 'infobox');
        this.update();
        return this._div;
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
      this._div.innerHTML = ''
    }

    infoBox.addTo(map);
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


    // $.getJSON("assets/americanhandelsociety_map.geojson",function(data){
    //     // chicago_boundary = L.geoJson(data, {
    //     //     style: {opacity: 1, weight: 1, color: "#333", fillOpacity: 0}
    //     // });
    //     // chicago_boundary.addTo(map);

    //   districts = L.geoJson(data, {
    //     style: {
    //             "color": "{{MAP_CONFIG.color}}",
    //             "weight": 1,
    //             "opacity": 1,
    //             "fillOpacity": .2
    //         },
    //     onEachFeature: onEachFeature
    // });
    // });


    // // Add points to map
    // $.getJSON("assets/americanhandelsociety_map.geojson",function(data){
    //     // districts = L.geoJson(data, {
    //     //     style: {opacity: 1, weight: 1, color: "#333", fillOpacity: 0},
    //     //     // onEachFeature: onEachFeature
    //     // });


    //     districts = L.mapbox.featureLayer(data)
    //     districts.addTo(map);
    // });
   



    function doSearch() {
        clearSearch();
        var address = $("#search-address").val();

        if (address != "") {
          // $("#reset").show()
          if (address.toLowerCase().indexOf(locationScope) == -1)
            address = address + " " + locationScope;

          geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              currentPinpoint = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
              $.address.parameter('address', encodeURIComponent(address));
              centerMark = new L.Marker(currentPinpoint, { icon: (new L.Icon({
                iconUrl: "assets/push_pin.png",
                iconSize: [32, 32],
                iconAnchor: [10, 32]
              }))}).addTo(map);

              // find the district here
              // search_result = leafletPip.pointInLayer([currentPinpoint[1], currentPinpoint[0]], districts);

              // Do not use pointInLayer...I want to know the distance from a certain point!

              console.log(currentPinpoint[1], currentPinpoint[0], "!!!")
              console.log(districts)
              // console.log(search_result, "!!!!")


var RADIUS = 3050;
var filterCircle = L.circle(currentPinpoint, RADIUS, {
    opacity: 1,
    weight: 1,
    fillOpacity: 0.4
}).addTo(map);

var latlng = L.latLng(currentPinpoint[0], currentPinpoint[1]);


// thiss = latlng.distanceTo(L.latLng(
//                 currentPinpoint[1], currentPinpoint[0]))




    // Add points to map
    $.getJSON("assets/americanhandelsociety_map.geojson",function(data){
        // districts = L.geoJson(data, {
        //     style: {opacity: 1, weight: 1, color: "#333", fillOpacity: 0},
        //     // onEachFeature: onEachFeature
        // });


        districts = L.mapbox.featureLayer(data)


districts.setFilter(function showLocations(feature) {

        return latlng.distanceTo(L.latLng(
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0])) < RADIUS
    });


        districts.addTo(map);
    });





              // if (search_result.length > 0) {
              //   search_result = search_result[0]
              //   map.removeLayer(districts);
              //   search_result.addTo(map);
              //   map.fitBounds(search_result.getBounds(), {padding: [50,50]});

              //   // if (council_member_table) {
              //   //     council_member_table.search("\\b" + search_result.feature.properties.district + "\\b", true, false).draw();
              //   // }






              // }
              // else {
              //   alert("'" + address + "' is not within London");
              // }


            }
            else {
              alert("We could not find your address: " + status);
            }
          });
        }
        else { //search without geocoding callback
          // map.fitBounds(districts.getBounds());
        }
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
            console.log("akdsfjasldkfj!")
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
