	$('#btnRun').click(function() {

		$.ajax({
			url: "libs/php/getCountryInfo.php",
			type: 'POST',
			dataType: 'json',
			data: {
				lat: $('#llat').val(),
				lng: $('#llng').val()
			},
			success: function(result) {

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {

					$('#geo1').html(result['data']['distance']);
					$('#geo2').html(result['data']['geonameId']);
					$('#geo3').html(result['data']['name']);

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// your error code
				console.log('hey');
			}
		}); 
	
	});