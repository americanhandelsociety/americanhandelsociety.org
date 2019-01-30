$(function() {

    function MapObj() {
        this.locationScope = 'London'.toLowerCase();
        this.currentPinpoint = null;
        this.centerMark = null;
        this.locations = null;
        this.search_result = null;
        this.map = null;
        this.centerMark = '';
        this.radiusCircle = '';
        // Create geocoder object to access Google Maps API. Add underscore to insure variable safety.
        this._geocoder = new google.maps.Geocoder();
        // Turn on autocomplete to predict address when user begins to type.
        this._autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-address'));
    }

    MapObj.prototype = {
        constructor: MapObj,

        initiateMap: function() {
            // Initiate leaflet map with mapbox tiles
            L.mapbox.accessToken = 'pk.eyJ1IjoicmVnaW5hZmNvbXB0b24iLCJhIjoiY2pxYnJxcGJ1MW53bTQybXQ5NWlqZWlnMyJ9.usfLqWOMKjLsr1jLxd78mg';

            this.map = L.map('map_canvas', {
                center: [51.5390, -0.1426],
                zoom: 11,
                scrollWheelZoom: false,
            });

            tiles = L.mapbox.tileLayer(
            'datamade.hn83a654', {
                attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong>"
            })
            tiles.addTo(this.map);
        },

        addInfoBox: function(mapPosition, divName, text) {
          var text = text || ''
          var info = L.control({position: mapPosition});

          info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', divName);
            this._div.innerHTML = text;
            return this._div;
          };

          info.addTo(this.map);
        },

        doSearch: function() {
            this.clearSearch();
            var $this = this;

            var radius = $("#search-radius").val();
            if (radius == null && address != "") {
                radius = 8050;
            }

            var address = $("#search-address").val();

            if (address != "") {
                $("#reset").show()
                if (address.toLowerCase().indexOf(this.locationScope) == -1) {
                    address = address + " " + locationScope;
                }

                this._geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        $this.currentPinpoint = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];

                        $.address.parameter('address', encodeURIComponent(address));

                        $this.setZoom(radius);
                        $this.addCircle(radius);
                        $this.addIcon()
                        
                        $this.map.removeLayer($this.locations);

                        var latlng = L.latLng($this.currentPinpoint[0], $this.currentPinpoint[1]);

                        $.getJSON("assets/americanhandelsociety_map.geojson",function(data) {
                            $this.locations = L.geoJson(data, {
                                onEachFeature: $this.onEachFeature,
                                filter: filterLocations,
                            });

                            function filterLocations(feature) {
                                if (feature.properties) {
                                    featureLatLong = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
                                    
                                    return latlng.distanceTo(featureLatLong) < radius
                                }

                            }
                            $this.locations.addTo($this.map);
                        });
                    }
                });
            } // Close geocoder.geocode
            
        },

        clearSearch: function() {
          if (this.centerMark)
            this.map.removeLayer(this.centerMark);
          if (this.radiusCircle)
            this.map.removeLayer(this.radiusCircle);
        },

        setZoom: function(radius) {
            var zoom = '';
            if (radius >= 8050) zoom = 11; // 5 miles
            else if (radius >= 3220) zoom = 12; // 2 miles
            else if (radius >= 1610) zoom = 13; // 1 mile
            else if (radius >= 805) zoom = 14; // 1/2 mile
            else if (radius >= 400) zoom = 15; // 1/4 mile
            else zoom = 15;

            this.map.setView(new L.LatLng( this.currentPinpoint[0], this.currentPinpoint[1] ), zoom)
        },

        addCircle: function(radius) {
            this.radiusCircle = L.circle(this.currentPinpoint, radius, {
                                    opacity: 1,
                                    color:'#91a8ba',
                                    weight: 1,
                                    fillOpacity: 0.5,
                                    fillColor:'#91a8ba',
                                });

            this.radiusCircle.addTo(this.map)
        },

        addIcon: function() {
            this.centerMark = new L.Marker(this.currentPinpoint, { 
                icon: (new L.Icon({
                    iconUrl: "assets/push_pin.png",
                    iconSize: [30, 30],
                    iconAnchor: [10, 32]
                })
            )});

            this.centerMark.addTo(this.map);
        },

        onEachFeature: function(feature, layer) {
            var mapName = "#map_canvas div"
            var $this = this;

            if (feature.properties) {
                console.log($this)
                var data = feature.properties
                layer.on('click', function(e){
                    // Clear previous content
                    $('.short-description, #address-header, #long-description, #info-url').empty();

                    // Add new content
                    $('.short-description').append(data.short_description);
                    $('#address-header').append('<i class="fa fa-map-marker" aria-hidden="true"></i> ' + data.address);
                    $('#long-description').append(data.long_description);

                    if (data.info_url) {
                    infoUrl = "<a href='" + data.info_url + "' target='_blank'><strong><i class='fa fa-info-circle' aria-hidden='true'></i> Learn more</strong></a>"
                    $('#info-url').append(infoUrl);
                    }

                    // Open the modal
                    $('#locationModal').modal(data)
                });

                layer.on('mouseover', function(e) {
                    $(mapName).css('cursor','pointer');
                    var short_description = "<h4 class='infoBox-title'> " + data.short_description + "</h4>"
                    var address = "<p><i class='fa fa-map-marker' aria-hidden='true'></i> " + data.address + "</p>"

                    $('html').find("div.infoBox").html(short_description + address);
                });

                layer.on('mouseout', function() {
                    $(mapName).css('cursor','inherit');
                    $('html').find("div.infoBox").html('Click on a location to learn more');
                });
            }
        },

    } // Close MapObj

    // Create a new instance of the MapObj
    var myMap = new MapObj

    myMap.initiateMap()
    myMap.addInfoBox('bottomleft', 'infoBox', 'Click on a location to learn more');
    
    $.getJSON("assets/americanhandelsociety_map.geojson",function(data) {
         myMap.locations = L.geoJson(data, {
            onEachFeature: myMap.onEachFeature
        });
        myMap.locations.addTo(myMap.map);
    });

    $("#btnSearch").on("click", function() {
        myMap.doSearch();
    });

});