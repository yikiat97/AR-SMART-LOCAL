
window.fbAsyncInit = function () {
    FB.init({
        appId: '133316473971491',
        cookie: true,
        xfbml: true,
        version: 'v2.10',
        oauth: true,
        status: false,
    });


};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "scripts/fb.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(".fb_login").click(function () {
    FB.login(checkLoginState);
    //FB.getLoginStatus(function (response) {
    //statusChangeCallback(response);
});


function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('Logged in and authenticated');
        setElements(true);
        testAPI();
        //window.location = "fbprofile.html";
    } else {
        console.log('Not authenticated');
        setElements(false);
    }
}
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);

        //window.location = "fbprofile.html";

    });
}
function testAPI() {
    FB.api('/me?fields=name,email,birthday,location,picture', function (response) {
        if (response && !response.error) {


            buildProfile(response);
        }
        FB.api('/me?', function (response) {
            if (response && !response.error) {
                buildFeed(response);
            }
        });
    })
}


//function fbsavenewuser(user) {
//    var userid = user.name;
//    var email = user.email;

//    var url = "http://mp02.mybitmp.org/friendzone" + "/fbnewuser.php";
//    var JSONObject = {
//        "userid": userid,
//        "email": email
//    };
//    var arr = JSON.parse(r.response);
//    $.ajax({
//                      url: url,
//                        type: 'GET',
//                        data: JSONObject,
//                        dataType: 'json',
//                        contentType: "application/json; charset=utf-8",

//                        success: function (arr) {
//                            alert("yay");
//                        },
//                        error: function () {
//                            alert("hais");
//                        }
//                    });

//}

function buildProfile(user) {

    var userid = user.name;

    var email = user.email;
    //var profileimage = user.picture.data.url;
    var profileimage = "https://graph.facebook.com/v2.10/" + user.id + "/picture";



    var url = "http://mp02.mybitmp.org/friendzone/fbnewuser.php?userid=" + userid + "&email=" + email + "&profileimage=" + profileimage;
    alert(url);
    var JSONObject = {
        "userid": userid,
        "email": email,
        "profileimage": profileimage
    };


    $.ajax({
        url: url,
        type: 'GET',
        data: JSONObject,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (arr) {

            alert("Success!");
            localStorage.setItem("useridfb", user.name);
            window.location = "mainpage.html";
        },
        error: function () {
            alert("Try again");
        }
    });


    //let profile =


    //    `
    //      <h3>${user.name}</h3>
    //      <ul class="list-group">
    //        <li class="list-group-item">User ID: ${user.id}</li>
    //        <li class="list-group-item">Email: ${user.email}</li>
    //        <li class="list-group-item">Birthday: ${user.birthday}</li>
    //        <li class="list-group-item">User ID: ${user.location.name}</li>
    //      </ul>
    //    `;


    //document.getElementById('profile').innerHTML = profile;

}
function buildFeed(feed) {


    let output = '<h3>Latest Posts</h3>';
    for (let i in feed.data) {
        if (feed.data[i].message) {
            output += `
              <div class="well">
                ${feed.data[i].message} <span>${feed.data[i].created_time}</span>
              </div>
            `;
        }
    }
    document.getElementById('feed').innerHTML = output;
}
function setElements(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById('logout').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('feed').style.display = 'block';
        document.getElementById('fb-btn').style.display = 'none';
        document.getElementById('heading').style.display = 'none';
    } else {
        document.getElementById('logout').style.display = 'none';
        document.getElementById('profile').style.display = 'none';
        document.getElementById('feed').style.display = 'none';
        document.getElementById('fb-btn').style.display = 'block';
        document.getElementById('heading').style.display = 'block';
    }
}
function logout() {
    FB.logout(function (response) {
        setElements(false);
    });
}






(function () {
    "use strict";
    var userid;
    var password;
    $(document).ready(function () {
        $("#LoginForm").validate({
            messages: {
                txtLogin: "User ID is required",
                txtPassword: "Password is required",
            },
            focusInvalid: false,
            submitHandler: function () {
                returnfalse;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            },
        });
        $("#btnLogin").bind("click", function () {
            if ($("#LoginForm").valid()) {
                login();
            }
        });
    });
    function login() {

        var url = "http://mp02.mybitmp.org/friendzone" + "/login.php";
        var result;
        userid = $("#txtLogin").val();
        password = $("#txtPassword").val();
        var JSONObject = {
            "userid": userid,
            "password": password
        };
        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                _getLoginResult(arr);
            },
            error: function () {
                validationMsg();
            }
        });
    }
    function _getLoginResult(arr) {
        if (arr[0].result.trim() !== "0") {
            localStorage.setItem("userid", userid);
            localStorage.setItem("password", password);
            validationMsgs("Login OK", "Information", "OK");
            window.location = "mainpage.html";
        } else {
            validationMsgs("Error in Username or Password", "Validation", "Try Again");
        }
    }
})();
function validationMsgs(message, title, button) {
    navigator.notification.alert(message,
        function () { }, title, button);
}

$("#btnNewUser").bind("click", function () { window.location = "newuser.html"; });
