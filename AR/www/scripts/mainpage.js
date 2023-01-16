
    var image;
        var eventname;
        var event = (function () {
            var result;

            var username = 'espore2';
            var password = '8r2pvfngz3xz';
            $.ajax({
        url: 'http://api.eventfinda.sg/v2/events.json?rows=5&fields=event:(name,images,description,web_sites,datetime_summary)&date_format=%A%20%e%20%B&date_start_end_separator=%20until%20',
                beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    },

                success: function (data) {
        result = data;

    var data = result.events.length
                    for (i = 0; i < result.events.length; i++) {
                        var image = result.events[i].images.images[0].transforms.transforms[3].url;
                        var eventname = result.events[i].name;
                        var description = result.events[i].description;
                        var web_sites = result.events[i].web_sites;
                        var datetime_summary = result.events[i].datetime_summary
                        
                        console.log(image);
                       // var list = document.getElementById(i);
                        //var html = ' <img class="mySlides" src="'+ image +'" style="width:100%"><div class="sildertext" > '+ eventname +'</div>'
                        //list.innerHTML = html;

                       
                        // var html = "<div><img src='" + image + "' > <div class='hi'>" + eventname + "</div></div >"
                        //list.innerHTML = html;

                        // console.log(html)






                        //$("#slideshow").append("  <div>" + datetime_summary + "</div >");
                        //$(".slideshow-container").append("  <div>" + web_sites + "</div >");
                    }
                    console.log(result);

                }
            });
        })();



        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
        }

        /* Set the width of the side navigation to 0 */
        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        }


        var myIndex = 0;
        carousel();

        function carousel() {
            var i;
            var x = document.getElementsByClassName("mySlides");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            myIndex++;
            if (myIndex > x.length) { myIndex = 1 }
            x[myIndex - 1].style.display = "block";
            setTimeout(carousel, 9000);
        }


        var slideIndex = 1;
        showDivs(slideIndex);

        function plusDivs(n) {
            showDivs(slideIndex += n);
        }

        function currentDiv(n) {
            showDivs(slideIndex = n);
        }

        function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("demo");
            if (n > x.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = x.length }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" w3-white", "");
            }
            x[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " w3-white";
        }
        /*  var slideIndex = 0;
        showSlides();

        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
            setTimeout(showSlides, 2000); // Change image every 2 seconds
        }

       */






         /*   $("#slideshow > div:gt(0)").hide();

        setInterval(function () {
                $('#slideshow > div:first')
                    .fadeOut(1000)
                    .next()
                    .fadeIn(1000)
                    .end()
                    .appendTo('#slideshow');
            }, 3000);*/
    