var World = {
	loaded: false,
	rotating: false,

	init: function initFn() {
		this.createModelAtLocation();
	},

	createModelAtLocation: function createModelAtLocationFn() {

		/*
			First a location where the model should be displayed will be defined. This location will be relativ to the user.	
		*/
      //  var geoLoc = new AR.GeoLocation(103.93326, 1.34414, 320.);		/*
			/*Next the model object is loaded.
		*/
       
        //var location = new AR.RelativeLocation(geoLoc, 5, 0, 2);
        var location = new AR.GeoLocation(1.34540, 103.93369 );

		/*
			Next the model object is loaded.
		*/
		var modelEarth = new AR.Model("assets/earth.wt3", {
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
        });

		/*
			Putting it all together the location and 3D model is added to an AR.GeoObject.
		*/
		var obj = new AR.GeoObject(location, {
            drawables: {
               cam: [modelEarth],
               indicator: [indicatorDrawable]
            }
        });
	},

	worldLoaded: function worldLoadedFn() {
		World.loaded = true;
		var e = document.getElementById('loadingMessage');
		e.parentElement.removeChild(e);
	}
};

World.init();
