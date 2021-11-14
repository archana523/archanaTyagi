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
var easy_button1;
var m;
var markerCluster;
var latlon;
var m1;
var name1;
var curCode;
var cname;
var name;
var name2;
var j;
var img;
var p;
var url;
var detail;
var easy_button2;
var detail;
var blueMarker;
var name3;
var placename;
var easy_button3;
$(window).on('load', function () 
	{if ($('#preloader').length)
		 {$('#preloader').delay(1000).fadeOut('slow',function () {$(this).remove();
		});
	}}
	);
$(document).ready(function(){
		//POPULATE COUNTRY IN DROPDOWN SELECT--------------------------------------------------------------
		$.ajax({
			url: "libs/php/countrySelect.php",
			type: 'POST',
			dataType: 'json',
			success: function(data) {
                console.log(data);
                console.log(data['data'][0]);
				for (var i = 0; i <data['data'].length; i++) {
				   var elem = $("<option></option>");
					elem.attr("value",data['data'][i]['code']);
					elem.text(data['data'][i]['name']);
					elem.appendTo($("#ccid"));
				 } 
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// your error code
				console.log('error while selecting country from dropdown list');
			}
		});
		
		//PERMISSION FROM USER TO USE LOCATION--------------------------------------------------------------
		permission();
		function permission() {
			var location = confirm("Give access to your location");
			if (location == true) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					lat = position.coords.latitude;
					lng = position.coords.longitude;
					latlon = encodeURIComponent([position.coords.latitude, position.coords.longitude]);
					console.log(latlon);
					geocode();
				});
        	}
    	} else {
			lat = 20.5937;
			lng = 78.9629;
			latlon = encodeURIComponent([lat, lng]);
			geocode();
			}
		};
	function geocode() {
						//GETTING CODE OF COUNTRY-------------------------------------------------------------------
						$.ajax({
							url:"libs/php/geoNames.php",
							type: 'POST',
							dataType: 'json',
							data: {
							  lat: lat,
							  lng: lng,
							},
							  success: function(result) {
							  if(result.status.name == "ok") {
								  isoCode = result['data'];
								  $('#ccid').val(isoCode);
								  mainMap();
							  }
							  },
							  error: function(jqXHR, textStatus, errorThrown) {
							  console.log('error while selecting currency Rate ');
							   }
						  });
	}
    
    $('#ccid').change(mainMap);//WHEN USER SELECTS COUNTRY FROM DROPDOWN LIST

	 // Main FUNCTION FOR DISPLAYING DATA OF REQUIRED COUNTRY--------------------------------------------------------
	function mainMap () {
                $('#result').html(' ');
                $('#currencyInput').val("");
                $('#currencyName').val("");
                
				placename = encodeURIComponent($("#ccid option:selected").html()+' places');
				console.log(placename);
				//AJAX FOR DISPLAYING IMAGES---------------------------------------------------------------------------
				$.ajax({
					url:"libs/php/images.php",
					type:'POST',
					dataType: 'json',
					data: {
						country: placename,
					},
					success: function(result) {
						console.log(JSON.stringify(result));
						if(result.status.name == "ok"){
							console.log(result.data[1].thumbnails[0].url);
							var imgi;
							$('#header3').html('Images of Famous Place in '+ $("#ccid option:selected").html());
							for(var i=0; i<6; i++){
								imgi = result.data[i].thumbnails[0].url;
								console.log(imgi);
								//$('#link'+ (i+1)).html(`<img src='${imgi}' width="190" height="100">`)
								$('#link' + (i+1)).html('<a href="' + result.data[i].page + '"target="_blank" rel="noopener">' + `<img src='${imgi}' width="190" height="100">` + '</a>')
							}
							if(easy_button3 != null){ mymap.removeControl(easy_button3);}
						easy_button3 = L.easyButton('<i class="fa fa-image" style="font-size:18px;color:red"></i>', function(btn, map){
						$('#modal3').modal('show');
						}).addTo(mymap);
						}
					},
					error: function(jqXHR, textStatus, errorThrown) {
                        // your error code
                        console.log('error while selecting currency from dropdown list');
                    }
				})
				if(m != null){
							mymap.removeLayer(m);
							markerCluster.removeLayer(m)
							mymap.removeLayer(markerCluster);
				}
				//AJAX FOR CURRENCY EXCHANGE RATE---------------------------------------------------------
                $.ajax({
                    url: "libs/php/currencyData.php",
                    type: 'POST',
                    dataType: 'json',
                    success: function(result) {
                        var usedNames = [];
                        var usedCode = [];
                        for (var i = 0; i < result['data'].length; i++) {
                            if(i == 8) {continue;}
                            if(usedCode.indexOf(result['data'][i]['currencies'][0]['code']) == -1) {
                                var elem1 = $("<option></option>");
                                elem1.attr("value", result['data'][i]['currencies'][0]['code']);
                                elem1.text(result['data'][i]['currencies'][0]['name']+" ("+result['data'][i]['currencies'][0]['symbol']+")");
                                elem1.appendTo($("#currencyName"));
                                usedNames.push(result['data'][i]['currencies'][0]['name']);
                                usedCode.push(result['data'][i]['currencies'][0]['code']);
                            } 
                            $("#currencyName").html($("#currencyName option").sort(function (a, b) {
                                return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
                            }))
                            if(result['data'][i]['alpha2Code'] == $('#ccid').val()){
                                $('.currencyName').html(result['data'][i]['currencies'][0]['name']+" ("+result['data'][i]['currencies'][0]['symbol']+")");
                                curCode = result['data'][i]['currencies'][0]['code'];
                            //FUNCTION FOR CURRENCY RATE-------------------------------------------------------
                                function currency(){
                                console.log($('#currencyInput').val());
                                    $.ajax({
                                        url:"libs/php/currencyRate.php",
                                        type: 'POST',
                                        dataType: 'json',
                                        data: {
                                            from: curCode,
                                            to: $('#currencyName').val(),
                                            amount: $('#currencyInput').val(),
                                        },
                                        success: function(result){
                                            if(result.status.name == "ok") {
                                                if($('#currencyInput').val() == 0){
                                                    return 0;
                                                } else {
                                                    console.log(result['data']['result']);
                                                $('#result').html($('#currencyInput').val()+' '+ curCode + ' equals to ' + result['data']['result'].toFixed(2)+' ' +$('#currencyName').val());
                                                }
                                                
                                            }
                                        },
                                        error: function(jqXHR, textStatus, errorThrown) {
                                            // your error code
                                            console.log('error while selecting currency Rate ');
                                        }
                                    });
                                };
                                $('#currencyName').change(currency);
                                $('#currencyInput').on("input",currency);
                                }
                            }; 
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        // your error code
                        console.log('error while selecting currency from dropdown list');
                    }
                });	
				//AIRPORT DATA EXTRACTION AND DISPLAY------------------------------------------------------------------
							$.ajax({
								url: "libs/php/airport.php",
								type: 'POST',
								dataType: 'json',
								success: function(result){
									console.log(JSON.stringify(result.data['data']));
									markerCluster = L.markerClusterGroup();
									var redMarker = L.ExtraMarkers.icon({
										icon: 'fa-map-marker',
										markerColor: 'red',
										shape: 'square',
										prefix: 'fa'
									});
									if(result.status.name == "ok"){
										console.log(result.data[0]);
										for(var i=0; i<result.data.length; i++){
											if(result.data[i].country == $('#ccid').val()){
												m = L.marker([result.data[i].latitude, result.data[i].longitude], {icon: redMarker}).bindPopup(result.data[i].name);
												markerCluster.addLayer(m);
												mymap.addLayer(markerCluster);
											}
										}
									}
								},
								error: function(jqXHR, textStatus, errorThrown) {
									// your error code
									console.log('error applying clustering using countries data');
								}
							});
				console.log($('#ccid').val());
			$.ajax({
			url: "libs/php/getCountryInfo1.php",
			type: 'POST',
			dataType: 'json',
			data: {
				code1: $('#ccid').val()
			},
			cache: false,
			success: function(result) {
				if (result.status.name == "ok") {
					code2 = result['data']['alpha2Code'];
					//INFORMATION ABOUT COUNTRY
					$('#pop').html((result['data']['population']).toLocaleString());
					$('#cap').html(result['data']['capital']);
					$('#reg').html(result['data']['region']);
					$('#cur').html(result['data']['currencies'][0]['name']);
					$('#curs').html(result['data']['currencies'][0]['symbol']);
					$('#area').html((result['data']['area']).toLocaleString());
					$('#lang').html(result['data']['languages'][0]['name']);
					$('#coun').html(result['data']['name']);
					
					flag = result['data']['flag'];
					$('#flag').html(`<img src='${flag}' width="90" height="80">`);
					mymap.setView(result['data']['latlng']);
					
					//ADDING MARKER TO MAP
					 name2 = result['data']['capital'];
					 name3 = encodeURIComponent(result['data']['capital']);
					//ADDING WIKIPEDIA LINKS OF COUNTRY
					$.ajax({
						url: "libs/php/wikipedia.php",
						type: 'POST',
						dataType: 'json',
						contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
						data: {
							q: name3
						},
						success: function(result){
							console.log(JSON.stringify(result));
								if(result.status.name == "ok"){
									j = 1;
									for(var k=1; k<4; k++){
										$('#tit' + k).html('No record found!!!');
										$('#summ' + k).html('No record found!!!');
									}
									for(var i=0; i<result['data'].length; i++){
										if(result['data'][i]['countryCode'] == code2){
											detail = result['data'][i]['title'];
											console.log(i);
											$('#tit'+ (j)).html('<a href="' +'https://'+ result['data'][i]['wikipediaUrl'] + '"target="_blank" rel="noopener">' + detail + '</a>');
											$('#summ' + (j)).html(result['data'][i]['summary']);
											j++;
											blueMarker = L.ExtraMarkers.icon({
												icon: 'fa-map-marker',
												markerColor: 'blue',
												shape: 'square',
												prefix: 'fa'
											  });
										if (marker != null) mymap.removeLayer(marker);
										marker = L.marker([result['data'][i]['lat'],result['data'][i]['lng']], {icon: blueMarker}).addTo(mymap);
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
					//EXTRACTING INFO ABOUT NEWS ARTICLE----------------------------------------------------------------
					$.ajax({
						url:"libs/php/newsArticle.php",
						type: 'POST',
						dataType: 'json',
						data: {
							code: $('#ccid').val(),
						},
						success: function(result) {
							console.log(JSON.stringify(result.data['status']));
							if(result.status.name == "ok") {
								$('#header2').html('Latest Headlines of ' + $("#ccid option:selected").html());
								if(result.data['status'] != "ok") {
									for(var j =0; j<5; j++){
										$('#news' + (j+1)).html('SORRY NO NEWS RECORD FOUND!!!!')
									}
								}
								else {
									for(var i=0; i<5; i++){
										$('#news'+ (i+1)).html('<a href="' + result.data['articles'][i]['link'] + '"target="_blank" rel="noopener">'+ result.data['articles'][i]['title']+'</a>')
									}
								}
								if(easy_button2 != null){ mymap.removeControl(easy_button2);}
								easy_button2 = L.easyButton('<i class="fa fa-list-alt" style="font-size:18px;color:green"></i>', function(btn, map){
							   	$('#modal2').modal('show');
						   }).addTo(mymap);
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
							// your error code
							console.log('hey');
							}
					});
					//INFORMATION ABOUT WEATHER------------------------------------------------------------------------
								$.ajax({
										url: "libs/php/openWeatherCity.php",
										type: 'POST',
										dataType: 'json',
										data: {
										q: name3,
										},
										success: function(data1) {
										if (result.status.name == "ok"){
											for(var i=0; i< 5; i++){
												$("#day" + (i+1) +"Min").html(Number(data1['data']['list'][i]['main']['temp_min']).toFixed(1)+"°"+"C");
											}
											$("#des").html(data1['data']['list'][0]['weather'][0]['description'])
                                            $('#label').html("Weather Report of " + name2 +", "+ $("#ccid option:selected").html());
											for(var i=0; i< 5; i++){
												j = data1['data']['list'][i]['weather'][0]['icon'];
												img = 'https://openweathermap.org/img/wn/';
												p = '.png';
												url = `${img}${j}${p}`;
												console.log(url);
												console.log(j);
												if(i == 0){
													$("#img" + (i+1)).html(`<img src= '${url}' style= "height:90px; width:90px">`);
												} else {
													$("#img" + (i+1)).html(`<img src= '${url}'>`);
												}
												
											}
												//Getting and displaying the text for the upcoming five days of the week
												var d = new Date();
												var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];

												//Function to get the correct integer for the index of the days array
												function CheckDay(day){
													if(day + d.getDay() > 6){
														return day + d.getDay() - 7;
													}
													else{
														return day + d.getDay();
													}
												}
													for(i = 0; i<5; i++){
														$("#day" + (i+1)).html(weekday[CheckDay(i)]);
													}
											if(easy_button != null){ mymap.removeControl(easy_button);}
										 	easy_button = L.easyButton('<i class="fa fa-cloud" style="font-size:18px;color:blue"></i>', function(btn, map){
											$('#exampleModal').modal('show');
												//popup.setLatLng(mymap.getCenter()).openOn(mymap);
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
		//POLYGON USING COUNTRY BORDER COORDINATES.----------------------------------------------------------------------------
		$.ajax({
			url: "libs/php/countryBorder.php",
			type: 'POST',
			dataType: 'json',
			success: function(data){
			for(var i=0; i<data['data'].length; i++){
				if(data['data'][i]['code'] === $('#ccid').val()){
					if(polygon != null) {
						mymap.removeLayer(polygon);
					}
					polygon = L.geoJSON(data['data'][i]['features'] , {style: function(feature) {
						return {color: feature.blue};
				   }
				   }).addTo(mymap);
					mymap.fitBounds(polygon.getBounds());
				};
			};
		  },
			error: function(jqXHR, textStatus, errorThrown) {
			// your error code
			console.log('hey');
			}
		}); 
        //EXTRACTING COVID DATA OF COUNTRY--------------------------------------------------------------
        $.ajax({
            url:"libs/php/covidCases.php",
            type: 'POST',
            dataType: 'json',
            data: {
                code: $('#ccid').val(),
            },
            success: function(result) {
                if(result.status.name == "ok"){
                    $('#label1').html($("#ccid option:selected").html()+ ', Covid Statistics');
                    $('#reco').html(result['data'][0]['confirmed'].toLocaleString());
                    $('#reco1').html(result['data'][0]['recovered'].toLocaleString());
                    $('#reco2').html(result['data'][0]['deaths'].toLocaleString());
                    $('#reco3').html(result['data'][0]['critical'].toLocaleString());
                    if(easy_button1 != null){ mymap.removeControl(easy_button1);}
						easy_button1 = L.easyButton('<i class="fa fa-heartbeat" style="font-size:18px;color:red"></i>', function(btn, map){
						$('#modal1').modal('show');
						}).addTo(mymap);
                } 
            }
        });
	};
	var mymap = L.map('mapid').locate({setView: true, maxZoom: 9});
	Esri_NatGeoWorldMap.addTo(mymap);

	//ADDING SIDEBAR TO THE MAP
	var sidebar = L.control.sidebar('sidebar', {
		position: 'left'
	});
	mymap.addControl(sidebar);
	L.easyButton('<i class="fa fa-info-circle" style="font-size:18px;color:green"></i>', function(){
	sidebar.toggle();
	}).addTo(mymap);
		//ADDING BASEMAPS
		baseMaps = {
		"OpenStreetMap": OpenStreetMap_Mapnik,
		"OpenTopoMap": OpenTopoMap,
		//"CartoDB_Voyager": CartoDB_Voyager,
		"GeoWorldMap": Esri_NatGeoWorldMap,
		"ImageryTopo": USGS_USImageryTopo,
		"EarthAtNight": NASAGIBS_ViirsEarthAtNight2012
		};
		baseLayers = {
		"RailwayMap": OpenRailwayMap,
		"raincls": raincls,
		"temp": temp,
		"wind": wind
		};
		layerControl = L.control.layers(baseMaps, baseLayers).addTo(mymap);
});
