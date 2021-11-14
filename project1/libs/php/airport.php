<?php

	// remove for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	$url='https://travel-hacking-tool.p.rapidapi.com/api/listairports/';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
		"x-rapidapi-host: travel-hacking-tool.p.rapidapi.com",
		"x-rapidapi-key: 9ad31eb67cmshc89b947bd7eb749p1a77b5jsn848a9313fb3e"
	]);
	$data1=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($data1,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
