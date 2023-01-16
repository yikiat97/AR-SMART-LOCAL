
(function () {
    function forgetpwd() {
        if ($("#emailform").validate()) {
            var email = $("#forgetpw").val();
            //New User Saving Section
            // parameters: service_id, template_id, template_parameters
            emailjs.send("gmail", "forgetpw", { to_name: $("#forgetpw").val(), message: "http://mp02.mybitmp.org/friendzone/getpw.php" + "?email=" + email })
                .then(function (response) {
                    validationMsgs("Check your email for password");
                    console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                    window.location = "index.html";
                }, function (err) {
                    console.log("FAILED. error=", err);
                    validationMsgs("Message fail, invalid email");
                });
        }
    }
    function validationMsgs(message, title, button) {
        navigator.notification.alert(message,
            function () { }, title, button);
    }
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validate() {
        $("#forgetpw").text("");
        var email = $("#forgetpw").val();
        if (validateEmail(email)) {
            $("#forgetpw").text(email + " is valid :)");
            $("#forgetpw").css("color", "green");
        } else {
            $("#forgetpw").text(email + " is not valid :(");
            $("#forgetpw").css("color", "red");
        }
        return false;
    }

    $("#validate").bind("click", validate);
    $("#btnSubmit").bind("click", function () {
        forgetpwd();
    })
})();