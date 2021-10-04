$.getJSON("libs/js/countryBorders.geo.json", function(result) {
    for (var i = 0; i < result.features.length; i++) {
        var elem = $("<option></option>");
        elem.attr("value", result.features[i].properties.iso_a2);
        elem.text(result.features[i].properties.name);
        elem.appendTo($("#ccid"));
		$("#ccid").html($("#ccid option").sort(function (a, b) {
			return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
		}))
     }
});
var baseMaps;
var baseLayers;
var layerControl;
var marker;
var polygon;
var latit;
var longit;
var win;
var full;
var code2;
var helloPopup;
var popup;
var imageUrl;
var url;
var flag;
var easy_button;
$(document).ready(function(){
	$('#submitWeather').click(function() {
			$.ajax({
			url: "libs/php/getCountryInfo1.php",
			type: 'POST',
			dataType: 'json',
			data: {
				code1: $('#ccid').val()
			},
			cache: false,
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {
					console.log("All recieved well.");
					code2 = result['data']['alpha2Code'];
					console.log(result['data']['alpha2Code']);
	
					//INFORMATION ABOUT COUNTRY
					mymap.removeLayer(abc);
					$('#pop').html(result['data']['population']);
					$('#cap').html(result['data']['capital']);
					$('#reg').html(result['data']['region']);
					$('#cur').html(result['data']['currencies'][0]['name']);
					$('#curs').html(result['data']['currencies'][0]['symbol']);
					$('#area').html(result['data']['area']);
					$('#lang').html(result['data']['languages'][0]['name']);
					$('#nat').html(result['data']['nativeName']);
					$('#sub').html(result['data']['subregion']);
					$('#tim').html(result['data']['timezones']);
					flag = result['data']['flag'];
					$('#flag').html(`<img src='${flag}' width="40" height="40">`);
					console.log('hey');
					//POLYGON USING COUNTRY BORDER COORDINATES.
					$.getJSON("libs/js/countryBorders.geo.json", function(result) {
						for(var i=0; i<result.features.length; i++){
							if(result.features[i].properties.iso_a2 === code2){
								console.log(result.features[i].properties.iso_a2);
								if(polygon != null) {
									mymap.removeLayer(polygon);
								}
								polygon = L.geoJSON(result.features[i]).addTo(mymap);
								console.log(result.features[i]);
								mymap.fitBounds(polygon.getBounds());
							};
						};
					}); 
					mymap.setView(result['data']['latlng']);
					
					//ADDING MARKER TO MAP
					if (marker != null) mymap.removeLayer(marker);
					marker = L.marker(result['data']['latlng']).addTo(mymap);
					marker.bindPopup(L.popup().setContent(result['data']['capital']));
					//FLAG IMAGE ON MAP
					//url = result['data']['flags'][0];
					//console.log(url);
					//imageUrl = url;
					//imageBounds = [[result['data']['latlng'][0]+5, result['data']['latlng'][1]+5], [result['data']['latlng'][0]+1, result['data']['latlng'][1]+1]];
					//imageBounds = [[mymap.getSouthwest()],[mymap.getSouthwest()+1]];
					//L.imageOverlay(imageUrl, imageBounds).addTo(mymap);
					//L.imageOverlay(imageUrl, imageBounds).bringToFront();
					
					//INFORMATION ABOUT WEATHER
					$.ajax({
						url: "libs/php/getCountryInfo2.php",
						type: 'POST',
						dataType: 'json',
						data: {
							lat: result['data']['latlng'][0],
							lon: result['data']['latlng'][1]
							},
							success: function(data1) {
							console.log(JSON.stringify(data1));
								if (result.status.name == "ok"){
									console.log(data1['data']['weather'][0]['description']);
									if(popup != null) mymap.removeControl(easy_button);
									popup = L.popup().setContent('<h4>Weather report</h4>'+ 'Clouds: '+data1['data']['weather'][0]['description']
				+'<br />'+'Temp: '+ data1['data']['main']['temp']+' Celsius'+'<br />'+'Pressure: '+
				data1['data']['main']['pressure']+' hPa'+'<br />'+'Humidity: '+data1['data']['main']['humidity']
				+' %'+'<br />'+'Sea Level: '+data1['data']['main']['sea_level']+' hPa'+'<br />'+
				'Latitude: '+data1['data']['coord']['lon']+'<br />'+'Longitude: '+data1['data']['coord']['lat']
				+'<br />'+'Wind speed: '+data1['data']['wind']['speed']+' meter/sec');
									//marker.bindPopup(popup);
									//helloPopup = L.popup().setContent('<div id="openweathermap-widget-15"></div>');
									
									easy_button = L.easyButton('fa-globe', function(btn, map){
										//win =  L.control.window(mymap,{position: 'center',modal: true, content:'<div id="openweathermap-widget-15"></div>'})
									   //.showOn(0,200)
									   //window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 15,cityid: '2643743',appid: '4a953b341d84c4765dfb3d2d76c96cfb',units: 'metric',containerid: 'openweathermap-widget-15',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();
										popup.setLatLng(mymap.getCenter()).openOn(mymap);
									}).addTo(mymap);
								}
							}
					});
				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// your error code
				console.log('hey');
			}
		}); 
	});
	var mymap = L.map('mapid').fitWorld().locate({setView: true, maxZoom: 10});
	Esri_NatGeoWorldMap.addTo(mymap);
	function onLocationFound(e) {
		var radius = e.accuracy;
	
		L.marker(e.latlng).addTo(mymap)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();
	
		L.circle(e.latlng, radius+20).addTo(mymap);
	}
	
	mymap.on('locationfound', onLocationFound);
	
	var abc;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  latit = position.coords.latitude;
		  longit = position.coords.longitude;
		  // this is just a marker placed in that position
		 abc = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);
		  // move the map to have the location in its center
		 // mymap.panTo(new L.LatLng(latit, longit));
	  })
	};
	
	
	//ADDING SIDEBAR TO THE MAP
	var sidebar = L.control.sidebar('sidebar', {
		position: 'left'
	});
	mymap.addControl(sidebar);
	L.easyButton('fa-exchange', function(){
	sidebar.toggle();
	}).addTo(mymap);
	//L.control.scale().addTo(mymap);
	
		//ADDING BASEMAPS
		baseMaps = {
		"OpenStreetMap_Mapnik": OpenStreetMap_Mapnik,
		"OpenTopoMap": OpenTopoMap,
		"CartoDB_Voyager": CartoDB_Voyager,
		"Esri_NatGeoWorldMap": Esri_NatGeoWorldMap,
		"USGS_USImageryTopo": USGS_USImageryTopo,
		"NASAGIBS": NASAGIBS_ViirsEarthAtNight2012
		};
		baseLayers = {
		"OpenRailwayMap": OpenRailwayMap,
		"raincls": raincls,
		"temp": temp,
		"wind": wind
		};
		//mymap.addLayer(temp);
		//if(layerControl != null) mymap.removeControl(layerControl);
		layerControl = L.control.layers(baseMaps, baseLayers).addTo(mymap);
	//if(full != null) mymap.removeControl(full);
	full = L.control.fullscreen({
		position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
		title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
		titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
		content: null, // change the content of the button, can be HTML, default null
		forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
		forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
		fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
	  }).addTo(mymap);

	  	//helloPopup = L.popup().setContent('<div id="openweathermap-widget-15"></div>');

		//L.easyButton('fa-globe', function(btn, map){
			//win =  L.control.window(mymap,{position: 'center',modal: true, content:'<div id="openweathermap-widget-15"></div>'})
           //.showOn(0,200)
		  // window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 15,cityid: '2643743',appid: '4a953b341d84c4765dfb3d2d76c96cfb',units: 'metric',containerid: 'openweathermap-widget-15',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();
			//helloPopup.setLatLng(mymap.getCenter()).openOn(mymap);
		//}).addTo(mymap);

});


