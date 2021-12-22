<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getDepartmentByID.php?id=<id>

	// remove next two lines for production	

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	//header('Content-Type: application/json; charset=UTF-8');

	//$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
		
		mysqli_close($conn);

		echo json_encode($output);
		
		exit;

	}	

	// SQL statement accepts parameters and so is prepared to avoid SQL injection.
	// $_REQUEST used for development / debugging. Remember to change to $_POST for production
    $name = $_POST['name'];
	$idd = $_POST['idd'];
	$idl = $_POST['idl'];
	//$query = $conn->prepare("SELECT * FROM personnel p WHERE firstName LIKE '{$name}%' OR lastName LIKE '{$name}%'");
	$query1 = "SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, d.id as deptid, l.name as location, l.id as locid FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) WHERE p.firstName LIKE '{$name}%'";
	
	if(isset($_REQUEST["idd"]) and strlen($_REQUEST["idd"]) > 0){

	//echo json_encode(1);

	$query1= $query1.' and d.id ='.$_REQUEST['idd'];

	}
		if(isset($_REQUEST["idl"]) and strlen($_REQUEST["idl"]) > 0){

	//echo json_encode($sqlStr);

	$query1 = $query1.' and l.id ='.$_REQUEST['idl'];

	//echo json_encode($sqlStr);

	}
	$query = $conn->prepare($query1);

	
	
	$query->execute();
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		echo json_encode($output); 
	
		mysqli_close($conn);
		exit;

	}
	$result = $query->get_result();

   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;

	echo json_encode($output); 

	mysqli_close($conn);

?>