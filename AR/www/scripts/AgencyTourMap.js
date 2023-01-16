
function feedback() { window.location.href = "feedback.html"; };

/*document.addEventListener("deviceready", onDeviceReady, false);

var watchID = null;

// device APIs are available
//
function onDeviceReady() {
   
}


function watchPosition() {
    var options = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
    }
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    function onSuccess(position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}
watchPosition();*/



/*document.addEventListener('deviceready', function () {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal
        .startInit("b936f111-3957-4138-8084-aad8321f5555")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

    // Call syncHashedEmail anywhere in your app if you have the user's email.
    // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
    // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);*/


/*window.plugins.OneSignal.getIds(function (ids) {
    var notificationObj = {
        contents: { en: "message body" },
        include_player_ids: ["1dd608f2-c6a1-11e3-851d-000c2940e62c"]
    };
    window.plugins.OneSignal.postNotification(notificationObj,
        function (successResponse) {
            alert("Notification Post Success:", successResponse);
        },
        function (failedResponse) {
            console.log("Notification Post Failed: ", failedResponse);
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        }
    );
});*/

function gather() {
    $.ajax({
        url: 'http://mp02.mybitmp.org/friendzone/newnotifications.php?newnotifications.php?',


        success: function (data) {
            result = data;
            
        }
    });
}
//var username = "Hamid";
//var password = "peter"
//var tourid = 123;

$(".click").on('click', function () {
    $(this).toggleClass('open');
    $(this).next("#tourpage").slideToggle('400', 'linear');
    
});


//localStorage.setItem("tourid", tourid);



var username = localStorage.getItem("userid");

var password = localStorage.getItem("password");
//localStorage.setItem("tourid", tourid);
//var tourid = localStorage.getItem("tourid");

function initMap() {

    $("#touridbtn").click(function () {
        tourid();
        
    });


    function tourid() {       
        var tourid = document.getElementById("TourID").value;
        localStorage.setItem("tourid", tourid);
        
        $.ajax({
            url: 'http://mp02.mybitmp.org/friendzone/gettourfile.php?tourid=' + tourid,
            dataType: 'json',
            success: function (done) {
                console.log(done);

                var done3 = done;
                

                for (var j = 0, length = done3.length; j < length; j++) {
                    var data = done3[j];
                    var place = data.nameoftheplace;
                    var y = data.coordinates;
                    localStorage.setItem("place", place);
                    var date = data.datefortour
                    localStorage.setItem("date", date);
                   // y.push(data.coordinates);
                    
                }


                if (done3 == "") {
                    alert("Please use our live chat to book tour packages")
                    document.getElementById("viewuserlocation").style.display = "none";
                    document.getElementById("gather").style.display = "none";
                }

                else {
                    document.getElementById("feedback").style.display = "block";
                    document.getElementById("login").style.display = "none";
                    document.getElementById("shadow").style.display = "none";
                    document.getElementById("cover").style.display = "block";
                    //document.getElementById("tourpage").style.display = "block";
                    document.getElementById("click").style.display = "block";

             


                    var directionsService = new google.maps.DirectionsService;
                    var directionsDisplay = new google.maps.DirectionsRenderer;
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 12,
                        center: {
                            lat: 1.3928377383, lng: 103.82903741
                        }
                    });
                    directionsDisplay.setMap(map);

                    // document.getElementById('submit').addEventListener('click', function () {
                    calculateAndDisplayRoute(directionsService, directionsDisplay);
                    var places = place

                    // -------------- Start csv Conversion ------------------------->
                    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                        var place = localStorage.getItem("place"); 
                        var date = localStorage.getItem("date"); 
                        var partsOfStr = y.split(',');
                        var partsOfStr2 = place.split(',');
                        var date1 = date.split(',');
                            console.log(date1.toLocaleString());
                        console.log(date1)
                        
                        var full = [];
                        var fullplace = [];
                        var fulldate = [];
                        
                        for (i = 0; i < partsOfStr.length; i++) {
                            full.push(partsOfStr[i]);
                            
                        }

                        for (i = 0; i < partsOfStr2.length; i++) {
                            fulldate.push(date1[i]);
                            fullplace.push(partsOfStr2[i]);
                            var q =i+1
                            $(".comments").append('<div id="tourid"> <article class="comment"> <a class="comment-img" href="#non"> <img src="http://lorempixum.com/50/50/people/1" alt="" width="50" height="50" /> </a> <div class="comment-body">  <div class="text"><p>Place '+ q +' Name: <b>' + partsOfStr2[i] +' </p> </div><p class="attribution">Time: ' + date1[i]+'</p> </div> </article>  </div>  ');   

              
                                   
                                       
                                   
                                  
                              
          
                        }
                        // var Arr = JSON.stringify(partsOfStr)
                        //var Arr1 = parseFloat(full),
                        Arrlat = [],
                            Arrlng = [];
                        console.log(fulldate)
                        // console.log(Arr1)
                        for (i = 0; i < full.length; i++) {
                            if ((i + 2) % 2 == 0) {
                                Arrlat.push(parseFloat(full[i]));
                            }
                            else {
                                Arrlng.push(parseFloat(full[i]));
                                // var lng = parseFloat(Arrlng)
                            }
                        }

                        console.log(Arrlng);


                        /// console.log(lng)

                        var waypts = [];

                        for (i = 0; i < Arrlng.length; i++) {
                            var position = new google.maps.LatLng(Arrlat[i], Arrlng[i]);
                            
                           // var place = place[i];
                            
                           // localStorage.setItem("Arrlat[i]", Arrlat[i]);
                           // localStorage.setItem("Arrlng[i]", Arrlng[i]);

                        //----------------Set Marker for all the Tour stop point and people's location-----------
                        var marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            title: 'places'
                        });
                        var marker1 = new google.maps.Marker({
                            map: map,
                            icon: 'images/current.png',
                            title: 'mylocation'
                        });
                      

                        //------------ Looping the function for Currrent Location and insert to DATABASE 
                        //-              Got NEW WAY. WATCH POSITION FUNCTION    ----------->
                        //function e() {
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
                                localStorage.setItem("myposition", myposition);


                                var latlng = new google.maps.LatLng(myposition);
                                marker1.setPosition(latlng);

                                var username = localStorage.getItem("userid");
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


                        // setTimeout(e, 1000);
                        //  }; e();

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
                        var username = localStorage.getItem("userid");
                        var tourid = localStorage.getItem("tourid");
                        $.ajax({
                            url: 'http://mp02.mybitmp.org/friendzone/viewalllocation.php?tourid=' + tourid + '&userid=' + username,
                            dataType: 'json',
                            success: function (done) {
                                
                                var data = done;
                                console.log(data);
                               
                                if (data[0].agency == 'yes') {
                                   
                                    document.getElementById("gather").style.display = "block";
                                    var marker4 = new google.maps.Marker({
                                        position: position,
                                        map: map,
                                        title: "shareposition"
                                    });

                                    function a() {
                                        $.ajax({
                                            url: 'http://mp02.mybitmp.org/friendzone/viewagencylocation.php?tourid=' + tourid + '&agency=',
                                            dataType: 'json',
                                            success: function (done) {

                                                var data = done;
                                                console.log(data);
                                                var data = done;
                                                console.log(data);
                                                for (i = 0; i < data.length; i++) {
                                                    console.log(data[i].currentlocation)
                                                    var shareposition = data[i].currentlocation

                                                    var xy = shareposition.split(",")
                                                    console.log(xy);
                                                    for (i = 0; i < xy.length; i++) {
                                                        var x = xy[0]
                                                        var y = xy[1]
                                                    }
                                                    console.log(x)
                                                    console.log(y)
                                                    // var shareposition1 = parseFloat(x,y);
                                                    var xx = parseFloat(x);
                                                    var yy = parseFloat(y);
                                                    var position = new google.maps.LatLng(xx, yy);
                                                    marker4.setPosition(position);
                                                    
                                                    // marker4.setMap(map);
                                                    //alert('yesssssssssssssssssssssss');

                                                }
                                            }
                                        });

                                        setTimeout(a, 5000);
                                    }
                                   
                                    a();
                                }
                               
                                else if (data[0].agency == '') {
                                   
                                   
                                    function a() {
                                        $.ajax({
                                            url: 'http://mp02.mybitmp.org/friendzone/viewagencylocation.php?tourid=' + tourid + '&agency=yes',
                                            dataType: 'json',
                                            success: function (done) {
                                               
                                                var data = done;
                                                console.log(data);
                                                var data = done;
                                                console.log(data);
                                                for (i = 0; i < data.length; i++) {
                                                    console.log(data[i].currentlocation)
                                                    var shareposition = data[i].currentlocation

                                                    var xy = shareposition.split(",")
                                                    console.log(xy);
                                                    for (i = 0; i < xy.length; i++) {
                                                        var x = xy[0]
                                                        var y = xy[1]
                                                    }
                                                    console.log(x)
                                                    // var shareposition1 = parseFloat(x,y);
                                                    var xx = parseFloat(x);
                                                    var yy = parseFloat(y);
                                                    var position = new google.maps.LatLng(xx, yy);
                                                   // var position = new google.maps.LatLng(x, y);
                                                    var marker4 = new google.maps.Marker({
                                                        position: position,
                                                        map: map,
                                                        title: "shareposition"
                                                    });

                                                    marker4.setPosition(position);

                                                    // marker4.setMap(map);
                                                    //alert('yesssssssssssssssssssssss');
                                                }

                                            }

                                        });
                                    }
                                   
                                    setTimeout(a, 5000);
                                }
                               
                                a();
                            }
                        })
                        

                        

                        // onError Callback receives a PositionError object
                        //
                        function onError(error) {
                            alert('code: ' + error.code + '\n' +
                                'message: ' + error.message + '\n');
                        }

                        // ------------ Inforwindow Set CONTENT
                       
                        
                        var infowindow = new google.maps.InfoWindow()
                        console.log(fullplace)
                            var xx = Arrlat[i];
                            var yy = Arrlng[i];
                            //var placejson = 
                            //for (i = 0; i < Arrlng.length; i++) { }
                        var content = '<div id ="agencyplace"> Place: ' +  fullplace[i]
                        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                            google.maps.event.addListener(marker, 'click', function (evt) {

                                //var x;
                                //var y;
                                //var timeposition1 = this.position;
                                //var timeposition = timeposition1.split(',');
                                //x.push(timeposition[0]);
                                //y.push(timeposition[1]);
                                //alert(timeposition[0]);

                                var infowindow = new google.maps.InfoWindow()
                                var geocoder = new google.maps.Geocoder
                               
                                var addresslat = parseFloat(evt.latLng.lat())
                                var addresslng = parseFloat(evt.latLng.lng())
                               // localStorage.setItem("addresslat", addresslat);
                               // localStorage.setItem("addresslng", addresslng);
                                // ---------------- EStimate time and push to <div>id = agencytime
                                function loopb() {
                                   // var lat = localStorage.getItem("addresslat");
                                   // var lng = localStorage.getItem("addresslng");
                                    var latx = localStorage.getItem("lat");
                                    var lngy = localStorage.getItem("lng");
                                    
                                    
                                    console.log(latx);
                                    console.log(lngy);
                                  
                                    $.ajax({
                                        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + latx + ',' + lngy + '&destinations=' + addresslat + ',' + addresslng+'&mode=driving&language=fr-FR&traffic_model=pessimistic&departure_time=now',
                                        dataType: 'json',
                                        success: function (done) {
                                            var data = done;
                                            console.log(data)
                                            var estimatedtime = data.rows[0].elements[0].duration.text
                                            localStorage.setItem("estimatedtime", estimatedtime)
                                            document.getElementById("agencytime").innerHTML = "this is the time: " + estimatedtime;
                                        },
                                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                                            alert("Status: " + textStatus); alert("Error: " + errorThrown);
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


                       
                            //var position = new google.maps.LatLng(Arrlat[i], Arrlng[i]);
                            console.log(position)

                            //-------Waypoint start here
                            if (position) {
                                waypts.push({
                                    location: position,
                                    stopover: false
                                });
                                localStorage.setItem("waypts", waypts);
                            }

                            localStorage.setItem("position", position);


                            var startx = parseFloat(1.383666);
                            var starty = parseFloat(103.895533);
                            var start = { lat: startx, lng: starty };

                            var endx = parseFloat(1.383666);
                            var endy = parseFloat(103.895533);
                            var end = { lat: startx, lng: starty };
                            var position = localStorage.getItem("waypts");
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

                                }
                            });
                        }
                    }

                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }  
        });


    }
}





       /* $.ajax({
            url: 'http://mp02.mybitmp.org/friendzone/viewalllocation.php?userid=' + username + '&password=' + password + '&tourid=' + tourid,
            dataType: 'json',
            success: function (done3) {
                var data3 = done3;
                console.log(data3)
                for (var j = 0, length = data3.length; j < length; j++) {
                    if (data3[j].agency === "") {
                        document.getElementById("gather").style.display = "none";
                    }
                }
            }
        });*/





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

    





/*
function date_time(id) {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
    d = date.getDate();
    day = date.getDay();
    days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    //var hours = localStorage.getItem("hours");
    //var minutes = localStorage.getItem("minutes");
    var hours = 12;
    var minutes = 57;
    localStorage.setItem("h", h);
    localStorage.setItem("m", m);
   
    result = '' + days[day] + ' ' + months[month] + ' ' + d + ' ' + year + ' ' + h + ':' + m + ':' + s;
    document.getElementById(id).innerHTML = result;
    setTimeout('date_time("' + id + '");', '1000');
    return true;



}
function ampm(time) {
    console.log(time);
    if (time.value !== "") {
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var suffix = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        hours = hours < 10 ? "0" + hours : hours;
        localStorage.setItem("hours", hours);
        localStorage.setItem("minutes", minutes);
        var displayTime = hours + ":" + minutes + " " + suffix;
        document.getElementById("display_time").innerHTML = displayTime;
    }
} */