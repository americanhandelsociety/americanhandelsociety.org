$(function() {

    function MapObj() {
        this.locationScope = 'London'.toLowerCase();
        this.currentPinpoint = null;
        this.centerMark = null;
        this.districts = null;
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
                center: [51.509865, -0.118092],
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
            var mapObjCopy = this;

            var radius = $("#search-radius").val();
            if (radius == null && address != "") {
                radius = 8050;
            }

            var address = $("#search-address").val();
            mapObjCopy.map = this.map

            if (address != "") {
                // $("#reset").show()
                if (address.toLowerCase().indexOf(this.locationScope) == -1) {
                    address = address + " " + locationScope;
                }

                this._geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        mapObjCopy.currentPinpoint = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];

                        $.address.parameter('address', encodeURIComponent(address));

                        mapObjCopy.setZoom(radius);
                        mapObjCopy.addCircle(radius);
                        mapObjCopy.addIcon()
                        
                        mapObjCopy.map.removeLayer(mapObjCopy.districts);

                        var latlng = L.latLng(mapObjCopy.currentPinpoint[0], mapObjCopy.currentPinpoint[1]);

                        $.getJSON("assets/americanhandelsociety_map.geojson",function(data) {
                            mapObjCopy.districts = L.mapbox.featureLayer(data)

                            mapObjCopy.districts.setFilter(function showLocations(feature) {
                                return latlng.distanceTo(L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])) < radius
                            });

                            mapObjCopy.districts.addTo(mapObjCopy.map);
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
            if (radius >= 8050) zoom = 16; // 5 miles
            else if (radius >= 3220) zoom = 13; // 2 miles
            else if (radius >= 1610) zoom = 14; // 1 mile
            else if (radius >= 805) zoom = 15; // 1/2 mile
            else if (radius >= 400) zoom = 16; // 1/4 mile
            else zoom = 16;

            this.map.setView(new L.LatLng( this.currentPinpoint[0], this.currentPinpoint[1] ), zoom)
        },

        addCircle: function(radius) {
            this.radiusCircle = L.circle(this.currentPinpoint, radius, {
                                    opacity: 1,
                                    weight: 1,
                                    fillOpacity: 0.4
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



    // TODO: do we need `L.geoJson` for this?
    onEachFeature: function(feature, layer) {
        if (feature.properties) {

            var center = layer.getBounds().getCenter();

            if (map){
                layer.layerPopup = L.popup(customOptions, layer)
                                    .setLatLng(center)
                                    .setContent(feature.properties.popupContent);

                layer.on('click', function(e){
                    console.log("asdkfjl")
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




    } // Close MapObj


    // Create a new instance of the MapObj
    var myMap = new MapObj

    myMap.initiateMap()
    myMap.addInfoBox('bottomright', 'infoBox', 'Click on a location to learn more');
    
    $.getJSON("assets/americanhandelsociety_map.geojson",function(data) {
        myMap.districts = L.mapbox.featureLayer(data, {
            style: {opacity: 1, 
                    weight: 1, 
                    color: "#333", 
                    fillOpacity: 0 },
            onEachFeature: onEachFeature
        });
        myMap.districts.addTo(myMap.map);
    });

    $("#btnSearch").on("click", function() {
        myMap.doSearch();
    });

});