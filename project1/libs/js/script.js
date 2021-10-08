var baseMaps;
var abc;
var baseLayers;
var layerControl;
var marker;
var polygon;
var isoCode;
var lat;
var lng;
var win;
var full;
var code2;
var helloPopup;
var popup;
var imageUrl;
var url;
var flag;
var easy_button;
var m;
var markerCluster
$(document).ready(function(){
	//console.log(hey);

	permission();
	$.ajax({
		url: "libs/php/getCountryInfo3.php",
		type: 'POST',
		dataType: 'json',
		success: function(result) {
			//console.log(JSON.stringify(result));
			for (var i = 0; i < result.data.countryInfo.features.length; i++) {
				   var elem = $("<option></option>");
					elem.attr("value", result.data.countryInfo.features[i].properties.iso_a2);
					elem.text(result.data.countryInfo.features[i].properties.name);
					elem.appendTo($("#ccid"));
					$("#ccid").html($("#ccid option").sort(function (a, b) {
						return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
					}))
				 }
			}
		});
		$.ajax({
			url: "libs/php/countryData.php",
			type: 'POST',
			dataType: 'json',
			success: function(result){
				console.log(JSON.stringify(result));
				markerCluster = L.markerClusterGroup();
				var redMarker = L.ExtraMarkers.icon({
					icon: 'fa-map-marker',
					markerColor: 'red',
					shape: 'square',
					prefix: 'fa'
				  });
				if(result.status.name == "ok"){
					for(var i=0; i<result.data.length; i++){
						m = L.marker(result.data[i].latlng, {icon: redMarker}).bindPopup(result.data[i].name.official);
						//console.log(result.data[i].latlng);
						markerCluster.addLayer(m);
						//console.log(result.data.countryInfo.features[i].geometry.coordinates);
						mymap.addLayer(markerCluster);
					}
				}
			}
		});
	function permission() {
		var location = confirm("Give access to your location");
		if (location == true) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
					lat = position.coords.latitude;
					lng = position.coords.longitude;
					console.log(lat);
					console.log(lng);
			  $.ajax({
				  url:"libs/php/geoNames.php",
				  type: 'POST',
				  dataType: 'json',
				  data: {
					lat: lat,
					lng: lng,
				  },
				  success: function(result) {
					console.log(JSON.stringify(result));
					if(result.status.name == "ok") {
						isoCode = result['data'];
						console.log(isoCode);
						$.ajax({
							url: "libs/php/getCountryInfo1.php",
							type: 'POST',
							dataType: 'json',
							data: {
								code1: isoCode,
							},
							cache: false,
							success: function(result) {
				
								console.log(JSON.stringify(result));
				
								if (result.status.name == "ok") {
									console.log("All recieved well.");
									code2 = result['data']['alpha2Code'];
									console.log(result['data']['alpha2Code']);
					
									//INFORMATION ABOUT COUNTRY
									console.log('eey');
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
									$('#flag').html(`<img src='${flag}' width="90" height="90">`);
									console.log('hey');
									//POLYGON USING COUNTRY BORDER COORDINATES.
									$.ajax({
										url: "libs/php/getCountryInfo3.php",
										type: 'POST',
										dataType: 'json',
										success: function(result){
										for(var i=0; i<result.data.countryInfo.features.length; i++){
											if(result.data.countryInfo.features[i].properties.iso_a2 === code2){
												console.log(result.data.countryInfo.features[i].properties.iso_a2);
												if(polygon != null) {
													mymap.removeLayer(polygon);
												}
												polygon = L.geoJSON(result.data.countryInfo.features[i]).addTo(mymap);

												console.log(result.data.countryInfo.features[i]);
												mymap.fitBounds(polygon.getBounds());
											};
										};
									  } 
									}); 
									mymap.setView(result['data']['latlng']);
									
									//ADDING MARKER TO MAP
									if (marker != null) mymap.removeLayer(marker);
									marker = L.marker(result['data']['latlng']).addTo(mymap);
									marker.bindPopup(L.popup().setContent(result['data']['capital']));
									
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
					}
				  }
			  })
		  })
		};
	}
}
	$('#submitWeather').click(function country() {
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
					console.log('eey');
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
					$('#flag').html(`<img src='${flag}' width="90" height="80">`);
					console.log('hey');
					//POLYGON USING COUNTRY BORDER COORDINATES.
					$.ajax({
						url: "libs/php/getCountryInfo3.php",
						type: 'POST',
						dataType: 'json',
						success: function(result){
						for(var i=0; i<result.data.countryInfo.features.length; i++){
							if(result.data.countryInfo.features[i].properties.iso_a2 === code2){
								console.log(result.data.countryInfo.features[i].properties.iso_a2);
								if(polygon != null) {
									mymap.removeLayer(polygon);
								}
								polygon = L.geoJSON(result.data.countryInfo.features[i]).addTo(mymap);
								console.log(result.data.countryInfo.features[i]);
								mymap.fitBounds(polygon.getBounds());
							};
						};
					  } 
					}); 
					mymap.setView(result['data']['latlng']);
					
					//ADDING MARKER TO MAP
					if (marker != null) mymap.removeLayer(marker);
					marker = L.marker(result['data']['latlng']).addTo(mymap);
					marker.bindPopup(L.popup().setContent(result['data']['capital']));
					
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

});
// markerCluster = L.markerClusterGroup();
// m = L.marker(L.geoJSON(result.data.countryInfo.features[i].geometry.coordinates));
// markerCluster.addLayer(m);
// console.log(result.data.countryInfo.features[i].geometry.coordinates);
// mymap.addLayer(markerCluster);

