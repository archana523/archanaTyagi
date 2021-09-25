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
					$('#con').html(result['data']['continent']);
					$('#tim').html(result['data']['timezones']);
					$('#flag').html(result['data']['flags'][0]);
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
									popup = L.popup().setLatLng(result['data']['latlng'])
    .setContent('<h4>Weather report</h4>'+ 'Clouds: '+data1['data']['weather'][0]['description']
				+'<br />'+'Temp: '+ data1['data']['main']['temp']+'<br />'+'Pressure: '+
				data1['data']['main']['pressure']+'<br />'+'Humidity: '+data1['data']['main']['humidity']
				+'<br />'+'Sea Level: '+data1['data']['main']['sea_level']+'<br />'+
				'Latitude: '+data1['data']['coord']['lon']+'<br />'+'Longitude: '+data1['data']['coord']['lat']);
									marker.bindPopup(popup);
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
	var mymap = L.map('mapid').locate({setView: true, maxZoom: 5});
	Esri_NatGeoWorldMap.addTo(mymap);
	
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
	L.control.scale().addTo(mymap);
		//ADDING BASEMAPS
		baseMaps = {
		"OpenStreetMap_Mapnik": OpenStreetMap_Mapnik,
		"OpenTopoMap": OpenTopoMap,
		"CartoDB_Voyager": CartoDB_Voyager,
		"Esri_NatGeoWorldMap": Esri_NatGeoWorldMap,
		"USGS_USImageryTopo": USGS_USImageryTopo,
		};
		baseLayers = {
		"precipitationcls": precipitationcls,
		"cloudscls": cloudscls,
		"raincls": raincls,
		"temp": temp,
		"wind": wind,
		"snow": snow
		};
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

	  //	helloPopup = L.popup().setContent('Hello World!');

		//L.easyButton('fa-globe', function(btn, map){
		//	win =  L.control.window(mymap,{title:'Hello world!',position: 'center', content:'This is my first control window.'})
          // .show()
			//helloPopup.setLatLng(map.getCenter()).openOn(map);
		//}).addTo(mymap);

});


