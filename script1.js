$('#btnRun1').click(function() {

    $.ajax({
        url: "libs/php/getCountryInfo1.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#lllat').val(),
            lng: $('#lllng').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#geo4').html(result['data']['city']);
                $('#geo5').html(result['data']['countryCode']);
                $('#geo6').html(result['data']['name']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('hey');
        }
    }); 

});