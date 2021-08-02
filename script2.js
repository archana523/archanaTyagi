$('#btnRun2').click(function() {

    $.ajax({
        url: "libs/php/getCountryInfo2.php",
        type: 'POST',
        dataType: 'json',
        data: {
            geonameId: $('#ggid').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#geo7').html(result['data'][0]['adminCode1']);
                $('#geo8').html(result['data'][0]['lng']);
                $('#geo9').html(result['data'][0]['countryId']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('hey');
        }
    }); 

});