$(function() {

    function MapObj() {
        this.locationScope = 'London'.toLowerCase();
        this.currentPinpoint = null;
        this.centerMark = null;
        this.districts = null;
        this.search_result = null;
        this.map = null;
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

        addAllLocations: function() {
            $map = this.map

            $.getJSON("assets/americanhandelsociety_map.geojson",function(data) {
                this.districts = L.mapbox.featureLayer(data, {
                    style: {opacity: 1, 
                            weight: 1, 
                            color: "#333", 
                            fillOpacity: 0 },
                });
                this.districts.addTo($map);
            });
        },

        doSearch: function() {
            clearSearch();
            var address = $("#search-address").val();
            $map = this.map

            if (address != "") {
                // $("#reset").show()
                if (address.toLowerCase().indexOf(this.locationScope) == -1) {
                    address = address + " " + locationScope;
                }

                this._geocoder.geocode( { 'address': address}, function(results, status) {
                    console.log(status, "!")
                    if (status == google.maps.GeocoderStatus.OK) {
                        currentPinpoint = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];

                        $.address.parameter('address', encodeURIComponent(address));

                        centerMark = new L.Marker(currentPinpoint, { icon: (new L.Icon({
                            iconUrl: "assets/push_pin.png",
                            iconSize: [32, 32],
                            iconAnchor: [10, 32]
                        }))}).addTo($map);

                        var RADIUS = 3050;
                        var filterCircle = L.circle(currentPinpoint, RADIUS, {
                            opacity: 1,
                            weight: 1,
                            fillOpacity: 0.4
                        }).addTo($map);

                        var latlng = L.latLng(currentPinpoint[0], currentPinpoint[1]);

                        $.getJSON("assets/americanhandelsociety_map.geojson",function(data) {
                            districts = L.mapbox.featureLayer(data)

                            districts.setFilter(function showLocations(feature) {
                                return latlng.distanceTo(L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])) < RADIUS
                            });

                            districts.addTo($map);
                        });

                    }
                });
            } // Close geocoder.geocode
            

        },



    } // Close MapObj

    // Create a new instance of the MapObj, and then call functions.
    var myMap = new MapObj

    myMap.initiateMap()
    myMap.addAllLocations()

    $("#btnSearch").on("click", function() {
        myMap.doSearch();
    });

});