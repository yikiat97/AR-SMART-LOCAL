document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    alert(navigator.notification);
}


function watchPosition() {
    var options = {
        maximumAge: 3600000,
        
        enableHighAccuracy: true,
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    function alertDismissed() {
        alert("hi");
    }
    function onSuccess(position) {
       
        var lat = position.coords.latitude
        var lng = position.coords.longitude
       
        localStorage.setItem("lat", lat);
        localStorage.setItem("lng", lng);
       /* navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName

        );
        navigator.vibrate(2000);*/
        //////////////////THIS IS THE ALERT BOX LA SIA
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}
watchPosition();

var username = "yikiat";
var password = "yikiat"
var tourid = 123;

localStorage.setItem("username", username);
var username = localStorage.getItem("username");
localStorage.setItem("password", password);
var password = localStorage.getItem("password");
localStorage.setItem("tourid", tourid);
var tourid = localStorage.getItem("tourid");

function initMap() {



/*
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log("navigator.geolocation works well");
        alert("navigator.geolocation works well");
        //navigator.geolocation.getCurrentPosition(onSuccess,
           // [onError]);
            

        var onSuccess = function (position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n');
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

       navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }

    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        if (result.state === 'granted') {
            alert('yes')
        } else if (result.state === 'prompt') {
            alert('no')
        }
    });
    */
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 1.3928377383, lng: 103.82903741 }
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      

// -------------- Start csv Conversion ------------------------->
   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            var waypts = [];
            $.ajax({
                url: 'data/realtourism.csv',
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
                    var json1 = JSON.parse(json);
             // Got JSon Start EXtracting Value


                    for (var j = 0, length = json1.length; j < length; j++) {
                        var data = json1[j];
                        var x = parseFloat(data.x);
                        var y = parseFloat(data.y);
                        var address = { lat: x, lng: y };


                        var startx = parseFloat(data.startx);
                        var starty = parseFloat(data.starty);
                        var start = { lat: startx, lng: starty };


                        var endx = parseFloat(data.endx);
                        var endy = parseFloat(data.endy);
                        var end = { lat: endx, lng: endy };

                        var place = data.place;
                       
    //----------------Set Marker for all the Tour stop point and people's location-----------
                        var marker = new google.maps.Marker({
                            position: address,
                            map: map,
                            title: 'good time'
                        });

                        var marker1 = new google.maps.Marker({
                            map: map,
                            title: 'mylocation'
                        });

                        //------------ Looping the function for Currrent Location and insert to DATABASE 
                        //-              Got NEW WAY. WATCH POSITION FUNCTION    ----------->
                        function e() {
                            var lat1 = localStorage.getItem("lat");
                            var lng1 = localStorage.getItem("lng");
                            var lat = parseFloat(lat1);
                            var lng = parseFloat(lng1);
                            var latlng = new google.maps.LatLng(lat,lng);
                            marker1.setPosition(latlng);
                            var username = localStorage.getItem("username");
                           

                            $.ajax({
                                url: 'http://mp02.mybitmp.org/friendzone/savenewlocation.php?currentlocation=' + lat + ',' + lng + '&userid=yikiat', //+ username,
                                dataType: 'json',
                                success: function (done) {

                                    var data = done;

                                    var x = document.getElementById("demo");
                                    x.innerHTML = "Latitude: " + lat +
                                        "<br>Longitude: " + lng;
                                }
                            })
                            var myposition = localStorage.getItem("myposition");

                            var changepoint = parseFloat(lat, lng)

                            
                             setTimeout(e, 1000);
                        }; e();

                      /*  document.addEventListener("deviceready", onDeviceReady, false);

                        var watchID = null;

                        // device APIs are available
                        //
                        function onDeviceReady() {
                            // Throw an error if no update is received every 30 seconds
                            var options = { timeout: 30000 };
                            watchID = navigator.geolocation.watchPosition(onSuccess, onError, options, { enableHighAccuracy: true });
                        }

                        // onSuccess Geolocation
                        //
                        function onSuccess(position) {
                            var element = document.getElementById('demo');
                            element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                                'Longitude: ' + position.coords.longitude + '<br />' +
                                '<hr />' + element.innerHTML;
                            var lat = position.coords.latitude
                            var lng = position.coords.longitude
                            var myposition = { lat, lng };
                            localStorage.setItem("lat", lat);
                            localStorage.setItem("lng", lng);
                            localStorage.setItem("myposition", myposition);
                            var latlng = new google.maps.LatLng(myposition);
                            marker1.setPosition(latlng);
                            var username = localStorage.getItem("username");
                            $.ajax({
                                url: 'http://mp02.mybitmp.org/friendzone/savenewlocation.php?currentlocation=' + lat + ',' + lng + '&userid=yikiat', //+ username,
                                dataType: 'json',
                                success: function (done) {
                                    alert('done')
                                    var data = done;

                                    var x = document.getElementById("demo");
                                    x.innerHTML = "Latitude: " + lat +
                                        "<br>Longitude: " + lng;
                                }
                            })
                        }*/
                        
                    

                    // onError Callback receives a PositionError object
                    //
                    function onError(error) {
                        alert('code: ' + error.code + '\n' +
                            'message: ' + error.message + '\n');
                    }

                   // ------------ Inforwindow Set CONTENT
                       
                        var infowindow = new google.maps.InfoWindow()

                        var content = '<div id ="agencyplace"> Place: ' + place + '</div><div id= "agencytime"></div>'
                        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                            google.maps.event.addListener(marker, 'click', function (evt) {
                             
                                var infowindow = new google.maps.InfoWindow()
                                var geocoder = new google.maps.Geocoder
                                var addresslat = parseFloat(evt.latLng.lat())
                                var addresslng = parseFloat(evt.latLng.lng())
                                localStorage.setItem("addresslat", addresslat);
                                localStorage.setItem("addresslng", addresslng);
                     // ---------------- EStimate time and push to <div>id = agencytime
                                function loopb() {  
                                var lat = localStorage.getItem("addresslat");
                                var lng = localStorage.getItem("addresslng");
                                var latx = localStorage.getItem("lat");
                                var lngy = localStorage.getItem("lng");
                                    $.ajax({
                                        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + latx + ',' + lngy + '&destinations=' + lat + ',' + lng + '&mode=driving&language=fr-FR&traffic_model=pessimistic&departure_time=now',
                                        dataType: 'json',
                                        success: function (done) {
                                            var data = done;
                                            console.log(latx)
                                            console.log(lngy)
                                            var estimatedtime = data.rows[0].elements[0].duration.text
                                            localStorage.setItem("estimatedtime", estimatedtime)
                                            document.getElementById("agencytime").innerHTML = "this is the time: " + estimatedtime;
                                        }
                                    });
                                    setTimeout(loopb, 2000);
                                }
                                loopb();                                   
                            });                           
                            return function () {
                                infowindow.setContent(content);
                                infowindow.open(map, marker);
                            };
                            google.maps.event.addListener(map, "click", function (event) {
                                infowindow.close();
                            });
                        })(marker, content, infowindow));

                        

                        //-------Waypoint start here
                        if (address) {
                            waypts.push({
                                location: address,
                                stopover: false
                            });
                        }
                    }
               directionsService.route({

                        origin: start,
                        destination: end,
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: 'DRIVING'

                    }, function (response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);

                            var route = response.routes[0];


                        } else {
                            window.alert('Directions request failed due to ' + status);
                            console.log(start);
                            console.log(address);
                        }
                    });

                }
            });
        }







    });


    //--------------  VIEW Tour Guide location and User location 

    $.ajax({
        url: 'http://mp02.mybitmp.org/friendzone/viewalllocation.php?userid=' + username + '&password=' + password + '&tourid=' + tourid,
        dataType: 'json',
        success: function (done3) {
            var data3 = done3;

            var username = localStorage.getItem("username");

            var password = localStorage.getItem("password");

            var tourid = localStorage.getItem("tourid");
            console.log(data3)
            for (var j = 0, length = data3.length; j < length; j++) {
                if (data3[j].agency === "yes") {
                    var a = data3[j].currentlocation
                    $.ajax({
                        url: 'http://mp02.mybitmp.org/friendzone/viewagencylocation.php?tourid=' + tourid + '&agency=',
                        dataType: 'json',
                        success: function (viewalllocation) {
                            var viewalllocation = viewalllocation;
                            for (var j = 0, length = viewalllocation.length; j < length; j++) {
                                console.log(viewalllocation)
                                var getlocation = viewalllocation[j].currentlocation;
                                var username = viewalllocation[j].userid;
                                var result = getlocation.split(",");
                                var x = parseFloat(result[0]);
                                var y = parseFloat(result[1]);
                                console.log(x)
                                console.log(y)
                                var content = '<div id="locationusername">' + username + '</div>';
                                var marker2 = new google.maps.InfoWindow({
                                    map: map,
                                    //icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                                    content: content,
                                    title: 'good time'
                                });
                                var latlng1 = new google.maps.LatLng(x, y);
                                 
                                marker2.setPosition(latlng1);
                            }
                        }
                    });


                    console.log(a)
                }
                else if (data3[j].result === "0") {

                    $.ajax({
                        url: 'http://mp02.mybitmp.org/friendzone/viewagencylocation.php?tourid=' + tourid + '&agency=yes',
                        dataType: 'json',
                        success: function (viewalllocation) {
                            var viewalllocation = viewalllocation;
                            console.log(viewalllocation)
                            var getlocation = viewalllocation[0].currentlocation
                            var result = getlocation.split(",");
                            var x = parseFloat(result[0]);
                            var y = parseFloat(result[1]);
                            console.log(x)
                            console.log(y)
                            alert('yes')
                            var marker2 = new google.maps.Marker({
                                map: map,
                                title: 'good time'
                            });
                            var latlng1 = new google.maps.LatLng(x, y);
                            marker2.setPosition(latlng1);

                        }
                    });


                }
            };

        },

    });



}



