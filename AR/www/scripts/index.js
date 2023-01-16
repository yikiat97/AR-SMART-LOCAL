// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    document.addEventListener('deviceready', function () {
        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        var notificationOpenedCallback = function (jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal
            .startInit("69fd2fa1-c419-4c7a-ad84-29ce9926ef39")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();

        // Call syncHashedEmail anywhere in your app if you have the user's email.
        // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
        // window.plugins.OneSignal.syncHashedEmail(userEmail);
    }, false);
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();







function container1() { window.location.href = "TourRouteMap.html"; };
function container2() { window.location.href = "imagerecon.html"; };
function container3() { window.location.href = "Categories.html"; };
function container4() { window.location.href = "translate1.html"; };
function container5() { window.location.href = "AugmentedReality.html"; };


