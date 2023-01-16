
function seeallplaces() {
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
                console.log(location);
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    category: category,
                    map: map,
                    title: data.location
                });





                var content
                var infowindow = new google.maps.InfoWindow()
                var geocoder = new google.maps.Geocoder

                google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow, geocoder) {
                    /* if (marker == 'nil'){ directionsDisplay.setMap(null); }*/


                    var content = '<div id="content">' +
                        '<h1>' + location + '</h1>' + '<div id="description">' + description + '</div></div>';


                    google.maps.event.addListener(marker, 'click', function (evt) {
                        /*document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' +
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

                            var selectedMode = document.getElementById('mode').value;
                            directionsService.route({
                                origin: { lat: 1.28351, lng: 103.84435 },  // Haight.
                                destination: latlng,  // Ocean Beach.

                                travelMode: google.maps.TravelMode[selectedMode]

                            }, function (response, status) {
                                if (status == 'OK') {
                                    directionsDisplay.setDirections(response);
                                } else {
                                    window.alert('Directions request failed due to ' + status);
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
               

                var content = '<div id="content">' +
                    '<h1>' + location + '</h1>' + '<div id="description">' + description + '</div></div>';

                console.log(x)
                google.maps.event.addListener(marker, 'click', function (evt) {
                   /* document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' +
                        evt.latLng.lat() + ' Current Lng: ' +
                        evt.latLng.lng() + '</p>';*/
                    var infowindow = new google.maps.InfoWindow()
                    var geocoder = new google.maps.Geocoder
                    var latlng = { lat: parseFloat(evt.latLng.lat()), lng: parseFloat(evt.latLng.lng()) };

                    function initMap() {
                        var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
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
                        
                        var selectedMode = document.getElementById('mode').value;
                        directionsService.route({
                            origin: { lat: 1.28351, lng: 103.84435 },  // Haight.
                            destination:  latlng ,  // Ocean Beach.
                            // Note that Javascript allows us to access the constant
                            // using square brackets and a string value as its
                            // "property."
                            travelMode: google.maps.TravelMode[selectedMode]
                            
                        }, function (response, status) {
                            if (status == 'OK') {
                                directionsDisplay.setDirections(response);
                            } else {
                                window.alert('Directions request failed due to ' + status);
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





/*var data = '{"product_id": "821415d8-3bd5-4e27-9604-194e4359a449", "start_latitude":"37.775232", "start_longitude": "-122.4197513", "end_latitude":"37.7899886", "end_longitude": "-122.4021253","seat_count": "2"}' 

$.ajax({
    url: 'https://api.uber.com/v1.2/estimates/time?start_latitude=37.7752315&start_longitude=-122.418075',
    beforeSend: function (xhxr) {
        xhxr.setRequestHeader("Content-Type", "application/json");
        xhxr.setRequestHeader("Authorization", "Uu4PGhj9MxaaDhSbK51Yor68H5-o9tHvTmkg24gG");
    },
    type: "GET",    
    success: function (xhxr) {
        console.log(xhxr);

    }
    
});*/



/*
    var username = 'espore';
    var password = 'cqmnkndhm5qh';
    $.ajax({
        url: 'http://api.eventfinda.sg/v2/categories.xml',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function (xhr) {
            console.log(xhr);
            
        }
    });




    $(document).ready(function () {
        $("button").click(function () {
            $("#div1").fadeIn();
            $("#div2").fadeIn("slow");
            $("#div3").fadeIn(3000);
        });
    });
*/






   
  


