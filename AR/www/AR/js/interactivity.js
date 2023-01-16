var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},


	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ImageTracker needs to be created in order to start the recognition engine. It is initialized with a AR.TargetCollectionResource specific to the target collection that should be used. Optional parameters are passed as object in the last argument. In this case a callback function for the onTargetsLoaded trigger is set. Once the tracker loaded all its target images, the function worldLoaded() is called.

			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.

			Adding multiple targets to a target collection is straightforward. Simply follow our Target Management Tool documentation. Each target in the target collection is identified by its target name. By using this target name, it is possible to create an AR.ImageTrackable for every target in the target collection.
		*/






        this.targetCollectionResource = new AR.TargetCollectionResource("assets/realrealreal.wtc", {
		});

		this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
			onTargetsLoaded: this.worldLoaded,
            onError: function(errorMessage) {
            	alert(errorMessage);
            }
		});


         this.modelCar = new AR.Model("assets/flyer.wt3", {
           // onLoaded: this.loadingStep,
            scale: {
                x: 0.0001,
                y: 0.0001,
                z: 0.0001
            },
            translate: {
                x: 0.0,
                y: 0.05,
                z: 0.5
            },
            rotate: {
                z: 20
            }
        });

		/*
			The button is created similar to the overlay feature. An AR.ImageResource defines the look of the button and is reused for both buttons.
		*/
         this.imgButton = new AR.ImageResource("assets/realbutton.jpg");
         this.imgButtonone = new AR.ImageResource("assets/wwwButton.jpg");




        this.sirenSound = new AR.Sound("assets/flyer.wav", {
            onError: function () {
                alert(errorMessage);
            },
            onFinishedPlaying: function () {
               /// World.setLightsEnabled(false);
            }
        });
        this.sirenSound.load();



//-----------------VIDEO------------------------------------------------------
        var playButtonImg = new AR.ImageResource("assets/playButton.png");
        var playButton = new AR.ImageDrawable(playButtonImg, 0.3, {
            enabled: false,
            clicked: false,
            zOrder: 2,
            onClick: function playButtonClicked() {
                World.video.play(1);
                World.video.playing = true;
                playButton.clicked = true;
            },
            translate: {
                y: -0.3
            }
        });
        this.video = new AR.VideoDrawable("assets/realvideo.mp4", 1.0, {
            translate: { y: playButton.translate.y },
            zOrder: 1,
            onLoaded: function videoLoaded() {
                playButton.enabled = true;
            },
            onPlaybackStarted: function videoPlaying() {
                playButton.enabled = false;
                World.video.enabled = true;
            },
            onFinishedPlaying: function videoFinished() {
                playButton.enabled = true;
                World.video.playing = false;
                World.video.enabled = false;
            },
            onClick: function videoClicked() {
                if (playButton.clicked) {
                    playButton.clicked = false;
                } else if (World.video.playing) {
                    World.video.pause();
                    World.video.playing = false;
                } else {
                    World.video.resume();
                    World.video.playing = true;
                }
            }
        });


//------------------USE HTML-------------------------------------
      /*  var weatherWidget = new AR.HtmlDrawable({
            uri: "assets/weather.html"
        }, 0.45, {
                viewportWidth: 820,
                viewportHeight: 700,
                backgroundColor: "#FFFFFF",
                translate: { x: 0.36, y: 0.5 },
                horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
                verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
                clickThroughEnabled: true,
                allowDocumentLocationChanges: false,
                onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
                    AR.context.openInBrowser(uri);
                }
        });*/

        //----------------------BUTTON 1--------------------------------------------------
        var pageThreeButton = this.createWwwButton("http://mp02.mybitmp.org/friendzone/quiz.html", 0.3, {       
            translate: {
                x: -0.8,
                y: -0.6
            },
            zOrder: 1
        });

		//-------------------------Button 2--------------------------------------------------
        var pageOneButton = this.createWwwButton("http://mp02.mybitmp.org/friendzone/quiz1.html", 0.3, {
			translate: {
				x: -0.8,
				y: -0.6
			},
			zOrder: 1
        });



        var pageTwoButton = this.createWwwButton("http://mp02.mybitmp.org/friendzone/quizstart.html", 0.3, {
            translate: {
                x: -0.8,
                y: -0.6
            },
            zOrder: 1
        });
       

       



       //---------------------------Button click to html
        this.buttonWebview = new AR.ImageResource("assets/playsound.jpg");
        var showWeb = function () {
           World.sirenSound.play();
            //var cssDivInstructions = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
            //var cssDivSurfer = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px; width: 38px'";
            //var cssDivBiker = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px;'";
            //document.getElementById('loadingMessage').innerHTML =
            //    "<div" + cssDivInstructions + ">Scan Target &#35;1 (surfer) or &#35;2 (biker):</div>" +
            //    "<button type='button' onclick='window.location.href = 'assets/stage1.html''>Click Me!</button>" +
            //    "<div" + cssDivSurfer + "><img src='assets/surfer.png'></img></div>" +
            //    "<div " + cssDivBiker + "><img src='assets/bike.png'></img></div>";
          
        };
        var buttonWeb = new AR.ImageDrawable(this.buttonWebview, 0.55, {//this part is image of the button
            onClick: showWeb, 
            translate: {
                x: 0.675,
                y: -0.725
            }
        });
        




      




        //---------------the base image used for pop ups-----------------------------------------------------





        var pageOne = new AR.ImageTrackable(this.tracker, "test4", {
            drawables: {
                cam: [pageThreeButton, buttonWeb, this.modelCar]
			},
			//onImageRecognized: this.removeLoadingBar,
           
            onImageRecognized: function onImageRecognizedFn() {
                World.pageOne.snapToScreen.enabled = false;
                World.removeLoadingBar();
            },
            snapToScreen: {
                enabledOnExitFieldOfVision: true,
                snapContainer: document.getElementById('snapContainer')
            },
            onError: function (errorMessage) {
                alert(errorMessage);
            }
        });


        var pages = new AR.ImageTrackable(this.tracker, "start", {
            drawables: {
                cam: [pageTwoButton]
            },
            onImageRecognized: this.removeLoadingBar,
            onError: function (errorMessage) {
                alert(errorMessage);
            }
        });



        var pageTwo = new AR.ImageTrackable(this.tracker, "test3", {
            drawables: {
                cam: [this.video, playButton, pageOneButton]
            },
            onImageRecognized: this.removeLoadingBar,
            onError: function (errorMessage) {
                alert(errorMessage);
            }
        });

        var pageThree = new AR.ImageTrackable(this.tracker, "test2", {
            drawables: {
                cam: [this.video, playButton]
            },
            onImageRecognized: this.removeLoadingBar,
            onError: function (errorMessage) {
                alert(errorMessage);
            }
        });


        var pageFour = new AR.ImageTrackable(this.tracker, "place4", {
            drawables: {
                cam: [this.video, playButton]
            },
            onImageRecognized: this.removeLoadingBar,
            onError: function (errorMessage) {
                alert(errorMessage);
            }
        });

      


    //    var location = new AR.GeoLocation(1.34414, 103.99226);

		/*
			Next the model object is loaded.
		*/
     /*   var modelEarth = new AR.Model("assets/earth.wt3", {
            onLoaded: this.worldLoaded,
            scale: {
                x: 1,
                y: 1,
                z: 1
            }
        });

        var indicatorImage = new AR.ImageResource("assets/indi.png");

        var indicatorDrawable = new AR.ImageDrawable(indicatorImage, 0.1, {
            verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP
        });   */

		/*
			Putting it all together the location and 3D model is added to an AR.GeoObject.
		*/
      /*  var obj = new AR.GeoObject(location, {
            drawables: {
                cam: [modelEarth],
                indicator: [indicatorDrawable]
            }
        });*/


      


//----------------------2ND IMAGE BASE----------------------------------------

    /*  var playButtonImg1 = new AR.ImageResource("assets/playButton.png");
        var playButton1 = new AR.ImageDrawable(playButtonImg, 0.3, {
            enabled: false,
            clicked: false,
            zOrder: 2,
            onClick: function playButtonClicked1() {
                World.video1.play(1);
                World.video1.playing = true;
                playButton1.clicked = true;
            },
            translate: {
                y: -0.3
            }
        });
        this.video1 = new AR.VideoDrawable("assets/video.mp4", 0.4, {
            translate: { y: playButton1.translate.y },
            zOrder: 1,
            onLoaded: function videoLoaded1() {
                playButton1.enabled = true;
            },
            onPlaybackStarted: function videoPlaying1() {
                playButton1.enabled = false;
                World.video1.enabled = true;
            },
            onFinishedPlaying: function videoFinished1() {
                playButton1.enabled = true;
                World.video1.playing = false;
                World.video1.enabled = false;
            },
            onClick: function videoClicked1() {
                if (playButton1.clicked) {
                    playButton1.clicked = false;
                } else if (World.video1.playing) {
                    World.video1.pause();
                    World.video1.playing = false;
                } else {
                    World.video1.resume();
                    World.video1.playing = true;
                }
            }
        });*/

       /* var Place1 = new AR.HtmlDrawable({
            uri: "assets/weather.html"
        }, 0.45, {
                viewportWidth: 2200,
                viewportHeight: 1500,
                backgroundColor: "#FFFFFF",
                translate: { x: 0.36, y: 0.5 },
                horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
                verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
                clickThroughEnabled: true,
                allowDocumentLocationChanges: false,
                onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
                    AR.context.openInBrowser(uri);
                }
            }); */

      /*  var imgTwo = new AR.ImageResource("assets/imageTwo.png");
        var overlayTwo = new AR.ImageDrawable(imgTwo, 0.5, {
            translate: {
                x: 0.12,
                y: -0.01
            }
        }); */

		/*
			The AR.ImageTrackable for the second page uses the same tracker but with a different target name and the second overlay.
		*/
       





	},

    createWwwButton: function createWwwButtonFn(url, size, options) {

        options.onClick = function () {
            AR.context.openInBrowser(url);

        };
        return new AR.ImageDrawable(this.imgButton, size, options);




    },




   



//------------------BASE IMAGE 3-----------------------------------------











    
	removeLoadingBar: function() {
		if (!World.loaded) {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
			World.loaded = true;
		}
	},

	worldLoaded: function worldLoadedFn() {
		
	}
};

World.init();

  