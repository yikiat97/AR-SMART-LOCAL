function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 1.3928377383, lng: 103.82903741
        }
    });
    var marker1 = new google.maps.Marker({
        map: map,
        icon: 'images/current.png',
        title: 'mylocation'
    });
    function watchPosition() {
        var options = {
            maximumAge: 3600000,
            enableHighAccuracy: true,
        }
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

        function onSuccess(position) {
            /* console.log('Latitude: ' + position.coords.latitude + '\n' +
                  'Longitude: ' + position.coords.longitude + '\n' +
                  'Altitude: ' + position.coords.altitude + '\n' +
                  'Accuracy: ' + position.coords.accuracy + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                  'Heading: ' + position.coords.heading + '\n' +
                  'Speed: ' + position.coords.speed + '\n' +
                  'Timestamp: ' + position.timestamp + '\n');*/
            var lat = position.coords.latitude
            var lng = position.coords.longitude
            var myposition = { lat, lng };
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
            // localStorage.setItem("lat", lat);
            //localStorage.setItem("lng", lng);
            //localStorage.setItem("myposition", myposition);


            var latlng = new google.maps.LatLng(myposition);
            marker1.setPosition(latlng);
            console.log(latlng);
            var username = localStorage.getItem("username");
            $.ajax({
                url: 'http://mp02.mybitmp.org/friendzone/savenewlocation.php?currentlocation=' + lat + ',' + lng + '&userid=' + username,
                dataType: 'json',
                success: function (done) {

                    var data = done;

                    /*    var x = document.getElementById("demo");
                        x.innerHTML = "Latitude: " + lat +
                            "<br>Longitude: " + lng;*/
                }
            })
            // var myposition = localStorage.getItem("myposition");

            // var changepoint = parseFloat(lat, lng)
        };

        function onError(error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }
    }
    watchPosition();
}

function filterMarkers(htmlcat) {

    var cat = htmlcat


    $.ajax({
        url: 'http://mp02.mybitmp.org/friendzone/viewcategory.php',
        dataType: 'text',
        success: function (done) {

            var data = done;

          
            var json = data;
          
            



            var map = new google.maps.Map(document.getElementById("map"), {
                center: new google.maps.LatLng(1.3, 103.82),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP

            });
            var marker1 = new google.maps.Marker({
                map: map,
                icon: 'images/current.png',
                title: 'mylocation'
            });
            function watchPosition() {
                var options = {
                    maximumAge: 3600000,
                    enableHighAccuracy: true,
                }
                var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    /* console.log('Latitude: ' + position.coords.latitude + '\n' +
                          'Longitude: ' + position.coords.longitude + '\n' +
                          'Altitude: ' + position.coords.altitude + '\n' +
                          'Accuracy: ' + position.coords.accuracy + '\n' +
                          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                          'Heading: ' + position.coords.heading + '\n' +
                          'Speed: ' + position.coords.speed + '\n' +
                          'Timestamp: ' + position.timestamp + '\n');*/
                    var lat = position.coords.latitude
                    var lng = position.coords.longitude
                    var myposition = { lat, lng };
                    localStorage.setItem("lat", lat);
                    localStorage.setItem("lng", lng);
                    // localStorage.setItem("lat", lat);
                    //localStorage.setItem("lng", lng);
                    //localStorage.setItem("myposition", myposition);


                    var latlng = new google.maps.LatLng(myposition);
                    marker1.setPosition(latlng);
                    
                    var username = localStorage.getItem("username");
                    $.ajax({
                        url: 'http://mp02.mybitmp.org/friendzone/savenewlocation.php?currentlocation=' + lat + ',' + lng + '&userid=' + username,
                        dataType: 'json',
                        success: function (done) {

                            var data = done;

                            /*    var x = document.getElementById("demo");
                                x.innerHTML = "Latitude: " + lat +
                                    "<br>Longitude: " + lng;*/
                        }
                    })
                    // var myposition = localStorage.getItem("myposition");

                    // var changepoint = parseFloat(lat, lng)
                };

                function onError(error) {
                    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                }
            }
            watchPosition();

            var json1 = JSON.parse(json);
           
            for (var j = 0, length = json1.length; j < length; j++) {
                var data = json1[j];
                var x = parseFloat(data.lat);
                var y = parseFloat(data.lng);
                var category = data.catid;
                var location = data.Name;
                var description = data.Description;
                console.log(x);
               var latLng = new google.maps.LatLng(x , y);
                
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                    position: latLng ,
                    category: category,
                    map: map,
                    title: data.location
                });

                // If is same category or category not picked
                if (marker.category == cat || cat.length === 0) {
                    marker.setVisible(true);
                }
                // Categories don't match 
                else {
                    marker.setVisible(false);
                }



                var content
                var infowindow = new google.maps.InfoWindow()
                var geocoder = new google.maps.Geocoder

                google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow, geocoder) {
                    /* if (marker == 'nil'){ directionsDisplay.setMap(null); }*/
                  /*  function watchPosition() {
                        var options = {
                            maximumAge: 3600000,
                            enableHighAccuracy: true,
                        }
                        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

                        function onSuccess(position) {
                          
                            var lat = position.coords.latitude
                            var lng = position.coords.longitude
                            var myposition = { lat, lng };
                            localStorage.setItem("lat", lat);
                            localStorage.setItem("lng", lng);
                        }
                    }*/

                    var content = '<div id="content">' +
                        '<h1>' + location + '</h1>' + '<div id="description">' + description + '</div></div>';

                    
                    google.maps.event.addListener(marker, 'click', function (evt) {
                        /* document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' +
                             evt.latLng.lat() + ' Current Lng: ' +
                             evt.latLng.lng() + '</p>';*/
                        var infowindow = new google.maps.InfoWindow()
                        var geocoder = new google.maps.Geocoder
                        var latlng = { lat: parseFloat(evt.latLng.lat()), lng: parseFloat(evt.latLng.lng()) };

                        function initMap() {
                            var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
                            var directionsService = new google.maps.DirectionsService;

                            directionsDisplay.setMap(map);

                            calculateAndDisplayRoute(directionsService, directionsDisplay);
                            document.getElementById('mode').addEventListener('change', function () {
                                calculateAndDisplayRoute(directionsService, directionsDisplay);
                            });
                        }
                        $(document).ready(function () {
                            $("#direction").on("click", function () {
                                initMap();
                            });
                        });





                        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                            var lat1 = localStorage.getItem("lat");
                            var lng1 = localStorage.getItem("lng");
                            var lat = parseFloat(lat1);
                            var lng = parseFloat(lng1);

                            var selectedMode = document.getElementById('mode').value;
                            directionsService.route({
                                origin: { lat: lat, lng: lng },  // Haight.
                                destination: latlng,  // Ocean Beach.
                                // Note that Javascript allows us to access the constant
                                // using square brackets and a string value as its
                                // "property."
                                travelMode: google.maps.TravelMode[selectedMode]

                            }, function (response, status) {
                                if (status == 'OK') {
                                    directionsDisplay.setDirections(response);
                                } else {
                                   // window.alert('Directions request failed due to ' + status);
                                    window.alert('Suggested transport is not allowed');
                                }
                            });
                        }
                        /* geocoder.geocode({ 'location': latlng }, function (results, status) {
                             if (status === 'OK') {
                                 if (results[0]) {
     
                                     infowindow.setContent(results[0].formatted_address);
                                     infowindow.open(map, marker);
                                     var address = results[0].formatted_address;
                                    
     
                                 } else {
                                     window.alert('No results found');
                                 }
                             } else {
                                 window.alert('Geocoder failed due to: ' + status);
                             }
                         });*/
                    });
                    return function () {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);


                    };
                })(marker, content, infowindow, geocoder));

            }


        }



    });

};

/*
function filterMarkers(htmlcat) {

    var cat = htmlcat


    $.ajax({
        url: 'data/category.csv',
        dataType: 'text',
        success: function (done) {

            var data = done;

            function CSVToArray(strData, strDelimiter) {

                strDelimiter = (strDelimiter || ",");
                var objPattern = new RegExp((
                    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
                var arrData = [[]];
                var arrMatches = null;
                while (arrMatches = objPattern.exec(strData)) {
                    var strMatchedDelimiter = arrMatches[1];
                    if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                        arrData.push([]);
                    }
                    if (arrMatches[2]) {
                        var strMatchedValue = arrMatches[2].replace(
                            new RegExp("\"\"", "g"), "\"");
                    } else {
                        var strMatchedValue = arrMatches[3];
                    }
                    arrData[arrData.length - 1].push(strMatchedValue);
                }
                return (arrData);
            }
            function CSV2JSON(csv) {
                var array = CSVToArray(csv);
                var objArray = [];
                for (var i = 1; i < array.length; i++) {
                    objArray[i - 1] = {};
                    for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                        var key = array[0][k];
                        objArray[i - 1][key] = array[i][k]
                    }
                }
                var json = JSON.stringify(objArray);
                var str = json.replace(/},/g, "},\r\n");
                return str;
            }
            var csv = data;
            var json = CSV2JSON(csv);
            $("#json").val(json);




            var map = new google.maps.Map(document.getElementById("map"), {
                center: new google.maps.LatLng(1.3, 103.82),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP

            });
            var marker1 = new google.maps.Marker({
                map: map,
                icon: 'images/current.png',
                title: 'mylocation'
            });
            function watchPosition() {
                var options = {
                    maximumAge: 3600000,
                    enableHighAccuracy: true,
                }
                var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    /* console.log('Latitude: ' + position.coords.latitude + '\n' +
                          'Longitude: ' + position.coords.longitude + '\n' +
                          'Altitude: ' + position.coords.altitude + '\n' +
                          'Accuracy: ' + position.coords.accuracy + '\n' +
                          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                          'Heading: ' + position.coords.heading + '\n' +
                          'Speed: ' + position.coords.speed + '\n' +
                          'Timestamp: ' + position.timestamp + '\n');*/
                 /*   var lat = position.coords.latitude
                    var lng = position.coords.longitude
                    var myposition = { lat, lng };
                    localStorage.setItem("lat", lat);
                    localStorage.setItem("lng", lng);
                    // localStorage.setItem("lat", lat);
                    //localStorage.setItem("lng", lng);
                    //localStorage.setItem("myposition", myposition);


                    var latlng = new google.maps.LatLng(myposition);
                    marker1.setPosition(latlng);
                    console.log(latlng);
                    var username = localStorage.getItem("username");
                    $.ajax({
                        url: 'http://mp02.mybitmp.org/friendzone/savenewlocation.php?currentlocation=' + lat + ',' + lng + '&userid=' + username,
                        dataType: 'json',
                        success: function (done) {

                            var data = done;

                            /*    var x = document.getElementById("demo");
                                x.innerHTML = "Latitude: " + lat +
                                    "<br>Longitude: " + lng;*/
             /*           }
                    })
                    // var myposition = localStorage.getItem("myposition");

                    // var changepoint = parseFloat(lat, lng)
                };

                function onError(error) {
                    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                }
            }
            watchPosition();

            var json1 = JSON.parse(json);
            console.log(json1);
            for (var j = 0, length = json1.length; j < length; j++) {
                var data = json1[j];
                var x = parseFloat(data.lat);
                var y = parseFloat(data.lng);
                var category = data.catid;
                var location = data.Name;
                var description = data.Description;

                latLng = new google.maps.LatLng(y, x);

                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    category: category,
                    map: map,
                    title: data.location
                });

                // If is same category or category not picked
                if (marker.category == cat || cat.length === 0) {
                    marker.setVisible(true);
                }
                // Categories don't match 
                else {
                    marker.setVisible(false);
                }



                var content
                var infowindow = new google.maps.InfoWindow()
                var geocoder = new google.maps.Geocoder

                google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow, geocoder) {
                    /* if (marker == 'nil'){ directionsDisplay.setMap(null); }*/
                    /*  function watchPosition() {
                          var options = {
                              maximumAge: 3600000,
                              enableHighAccuracy: true,
                          }
                          var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
  
                          function onSuccess(position) {
                            
                              var lat = position.coords.latitude
                              var lng = position.coords.longitude
                              var myposition = { lat, lng };
                              localStorage.setItem("lat", lat);
                              localStorage.setItem("lng", lng);
                          }
                      }*/

            /*        var content = '<div id="content">' +
                        '<h1>' + location + '</h1>' + '<div id="description">' + description + '</div></div>';

                    console.log(x)
                    google.maps.event.addListener(marker, 'click', function (evt) {
                        /* document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' +
                             evt.latLng.lat() + ' Current Lng: ' +
                             evt.latLng.lng() + '</p>';*/
        /*                var infowindow = new google.maps.InfoWindow()
                        var geocoder = new google.maps.Geocoder
                        var latlng = { lat: parseFloat(evt.latLng.lat()), lng: parseFloat(evt.latLng.lng()) };

                        function initMap() {
                            var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
                            var directionsService = new google.maps.DirectionsService;

                            directionsDisplay.setMap(map);

                            calculateAndDisplayRoute(directionsService, directionsDisplay);
                            document.getElementById('mode').addEventListener('change', function () {
                                calculateAndDisplayRoute(directionsService, directionsDisplay);
                            });
                        }
                        $(document).ready(function () {
                            $("#direction").on("click", function () {
                                initMap();
                            });
                        });





                        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                            var lat1 = localStorage.getItem("lat");
                            var lng1 = localStorage.getItem("lng");
                            var lat = parseFloat(lat1);
                            var lng = parseFloat(lng1);

                            var selectedMode = document.getElementById('mode').value;
                            directionsService.route({
                                origin: { lat: lat, lng: lng },  // Haight.
                                destination: latlng,  // Ocean Beach.
                                // Note that Javascript allows us to access the constant
                                // using square brackets and a string value as its
                                // "property."
                                travelMode: google.maps.TravelMode[selectedMode]

                            }, function (response, status) {
                                if (status == 'OK') {
                                    directionsDisplay.setDirections(response);
                                } else {
                                    // window.alert('Directions request failed due to ' + status);
                                    window.alert('Suggested transport is not allowed');
                                }
                            });
                        }
                        /* geocoder.geocode({ 'location': latlng }, function (results, status) {
                             if (status === 'OK') {
                                 if (results[0]) {
     
                                     infowindow.setContent(results[0].formatted_address);
                                     infowindow.open(map, marker);
                                     var address = results[0].formatted_address;
                                    
     
                                 } else {
                                     window.alert('No results found');
                                 }
                             } else {
                                 window.alert('Geocoder failed due to: ' + status);
                             }
                         });*/
    /*                });
                    return function () {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);


                    };
                })(marker, content, infowindow, geocoder));

            }


        }



    });

};*/