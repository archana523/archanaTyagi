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
var markerCluster;
$(document).ready(function(){
		//POPULATE COUNTRY IN DROPDOWN SELECT
		$.ajax({
			url: "libs/php/getCountryInfo3.php",
			type: 'POST',
			dataType: 'json',
			success: function(result) {
				for (var i = 0; i < result.data.countryInfo.features.length; i++) {
				   var elem = $("<option></option>");
					elem.attr("value", result.data.countryInfo.features[i].properties.iso_a2);
					elem.text(result.data.countryInfo.features[i].properties.name);
					elem.appendTo($("#ccid"));
					$("#ccid").html($("#ccid option").sort(function (a, b) {
						return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
					}))
				 }
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// your error code
				console.log('error while selecting country from dropdown list');
			}
		});
		//ADDING CITIES TO MAP
		// var city;
		// $.ajax({
		// 	url: "libs/php/cities.php",
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	success: function(result) {
		// 		//console.log(JSON.stringify(result));
		// 		if(result.status.name == "ok") {
		// 			for(var i=0; i<result.data.data.length; i++) {
		// 				if(result.data.data[i].country === 'Iran'){
		// 					city = result.data.data[i].cities;
		// 				}
		// 			} 
		// 		}console.log(city);
		// 	}
		// });
		//console.log(city);
		//ADDING MARKER CLUSTERING OF COUNTRIES
		// $.ajax({
		// 	url: "libs/php/countryData.php",
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	success: function(result){
		// 		//console.log(JSON.stringify(result));
		// 		markerCluster = L.markerClusterGroup();
		// 		var redMarker = L.ExtraMarkers.icon({
		// 			icon: 'fa-map-marker',
		// 			markerColor: 'red',
		// 			shape: 'square',
		// 			prefix: 'fa'
		// 		  });
		// 		if(result.status.name == "ok"){
		// 			for(var i=0; i<result.data.length; i++){
		// 				m = L.marker(result.data[i].latlng, {icon: redMarker}).bindPopup(result.data[i].name.official);
		// 				markerCluster.addLayer(m);
		// 				mymap.addLayer(markerCluster);
		// 			}
		// 		}
		// 	},
		// 	error: function(jqXHR, textStatus, errorThrown) {
		// 		// your error code
		// 		console.log('error applying clustering using countries data');
		// 	}
		// });

		$.ajax({
			url: "libs/php/airport.php",
			type: 'POST',
			dataType: 'json',
			success: function(result){
				//console.log(JSON.stringify(result));
				markerCluster = L.markerClusterGroup();
				var redMarker = L.ExtraMarkers.icon({
					icon: 'fa-map-marker',
					markerColor: 'red',
					shape: 'square',
					prefix: 'fa'
				  });
				if(result.status.name == "ok"){
					for(var i=0; i<result.data.length; i++){
						m = L.marker([result.data[i].lat, result.data[i].lon], {icon: redMarker}).bindPopup(result.data[i].name);
						markerCluster.addLayer(m);
						mymap.addLayer(markerCluster);
					}
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// your error code
				console.log('error applying clustering using countries data');
			}
		});
			//PERMISSION FROM USER TO USE LOCATION
		permission();
		function permission() {
			var location = confirm("Give access to your location");
			if (location == true) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					lat = position.coords.latitude;
					lng = position.coords.longitude;
					//console.log(lat);
					//console.log(lng);
				//GETTING CODE OF COUNTRY
			  	$.ajax({
				  url:"libs/php/geoNames.php",
				  type: 'POST',
				  dataType: 'json',
				  data: {
					lat: lat,
					lng: lng,
				  },
					success: function(result) {
					//console.log(JSON.stringify(result));
					if(result.status.name == "ok") {
						isoCode = result['data'];
						console.log(isoCode);
						//EXTRACTING DATA OF COUNTRY
						$.ajax({
							url: "libs/php/getCountryInfo1.php",
							type: 'POST',
							dataType: 'json',
							data: {
								code1: isoCode,
							},
							cache: false,
							success: function(result) {
				
								//console.log(JSON.stringify(result));
				
								if (result.status.name == "ok") {
									//console.log("All recieved well.");
									code2 = result['data']['alpha2Code'];
									//console.log(result['data']['alpha2Code']);
					
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
								
										mymap.setView(result['data']['latlng']);
										var name1 = encodeURIComponent(result['data']['capital']);
										console.log(name1);
										//console.log(name1);
										$.ajax({
											url: "libs/php/wikipedia.php",
											type: 'POST',
											contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
											dataType: 'json',
											data: {
											q: name1,
											},
											success: function(result){
											//console.log(JSON.stringify(result['data']));
											//console.log(JSON.stringify(result['data'][1]['lng']));
											if(result.status.name == "ok"){
												for(var i=0; i<result['data'].length; i++){
													if(result['data'][i]['countryCode'] == isoCode){
													if (marker != null) mymap.removeLayer(marker);
													marker = L.marker([result['data'][i]['lat'],result['data'][i]['lng']]).addTo(mymap);
													marker.bindPopup('<a href="' +'https://'+ result['data'][i]['wikipediaUrl'] + '"target="_blank" rel="noopener">' + name1 + '</a>');
												}
											}
											}
											},
											error: function(jqXHR, textStatus, errorThrown) {
											// your error code
											console.log('hey');
											}
										});
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
										//console.log(JSON.stringify(data1));
										if (result.status.name == "ok"){
										console.log(data1['data']['weather'][0]['description']);
										if(popup != null) mymap.removeControl(easy_button);
											popup = L.popup().setContent('<h4>Weather report</h4>'+ 'Clouds: '+data1['data']['weather'][0]['description']
											+'<br />'+'Temp: '+ data1['data']['main']['temp']+' Celsius'+'<br />'+'Pressure: '+
											data1['data']['main']['pressure']+' hPa'+'<br />'+'Humidity: '+data1['data']['main']['humidity']
											+' %'+'<br />'+'Sea Level: '+data1['data']['main']['sea_level']+' hPa'+'<br />'+
											'Latitude: '+data1['data']['coord']['lon']+'<br />'+'Longitude: '+data1['data']['coord']['lat']
											+'<br />'+'Wind speed: '+data1['data']['wind']['speed']+' meter/sec');													
											easy_button = L.easyButton('fa-globe', function(btn, map){
											popup.setLatLng(mymap.getCenter()).openOn(mymap);
										}).addTo(mymap);
										}
										},
										error: function(jqXHR, textStatus, errorThrown) {
										// your error code
										console.log('hey');
										}
									});
								}
							},
							error: function(jqXHR, textStatus, errorThrown) {
								// your error code
								console.log('hey');
							}
						});
							//POLYGON USING COUNTRY BORDER COORDINATES.
							$.ajax({
								url: "libs/php/getCountryInfo3.php",
								type: 'POST',
								dataType: 'json',
								success: function(result){
									if(result.status.name == "ok"){
									for(var i=0; i<result.data.countryInfo.features.length; i++){
										if(result.data.countryInfo.features[i].properties.iso_a2 === isoCode){
										//console.log(result.data.countryInfo.features[i].properties.iso_a2);
											if(polygon != null) {
											mymap.removeLayer(polygon);
											}
											polygon = L.geoJSON(result.data.countryInfo.features[i]).addTo(mymap);
											console.log(result.data.countryInfo.features[i]);
											mymap.fitBounds(polygon.getBounds());
											};
										};
									}
								},
								error: function(jqXHR, textStatus, errorThrown) {
								// your error code
								console.log('Polygon cant be loaded');
								}
							});
						}
					},
				error: function(jqXHR, textStatus, errorThrown) {
					// your error code
					console.log('Polygon cant be loaded');
				}
			});
				})
			}
		}
	};
		
	 //WHEN COUNTRY IS SELECTED FROM SELECT DROPDOWN
	$('#submitWeather').click(function () {
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
					
					mymap.setView(result['data']['latlng']);
					
					//ADDING MARKER TO MAP
					var name2 = result['data']['capital'];
					var name = encodeURIComponent(result['data']['capital']);
					console.log(name);
					$.ajax({
						url: "libs/php/wikipedia.php",
						type: 'POST',
						dataType: 'json',
						contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
						data: {
							q: name
						},
						success: function(result){
								if(result.status.name == "ok"){
									for(var i=0; i<result['data'].length; i++){
										if(result['data'][i]['countryCode'] == code2){
										if (marker != null) mymap.removeLayer(marker);
										marker = L.marker([result['data'][i]['lat'],result['data'][i]['lng']]).addTo(mymap);
										marker.bindPopup('<a href="' +'https://'+ result['data'][i]['wikipediaUrl'] + '"target="_blank" rel="noopener">' + name2 + '</a>');
									}
								  }
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
						// your error code
						console.log('hey');
						}
					});
					
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
									
									easy_button = L.easyButton('fa-globe', function(btn, map){
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
		//POLYGON USING COUNTRY BORDER COORDINATES.
		$.ajax({
			url: "libs/php/getCountryInfo3.php",
			type: 'POST',
			dataType: 'json',
			success: function(result){
			for(var i=0; i<result.data.countryInfo.features.length; i++){
				if(result.data.countryInfo.features[i].properties.iso_a2 === $('#ccid').val()){
					console.log(result.data.countryInfo.features[i].properties.iso_a2);
					if(polygon != null) {
						mymap.removeLayer(polygon);
					}
					polygon = L.geoJSON(result.data.countryInfo.features[i]).addTo(mymap);
					console.log(result.data.countryInfo.features[i]);
					mymap.fitBounds(polygon.getBounds());
				};
			};
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
		layerControl = L.control.layers(baseMaps, baseLayers).addTo(mymap);
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
