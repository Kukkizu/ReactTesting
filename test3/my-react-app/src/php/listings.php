<?php

header("Access-Control-Allow-Origin: *");

$host = 'localhost';
$username = 'root';
$password = '';
$dbName = 'kumaprints';

$conn = mysqli_connect($host, $username, $password, $dbName);

if (mysqli_connect_error()) {
    die('Error connecting to database' . mysqli_connect_error());
}

$sqlQuery = "SELECT * FROM `listings` ORDER BY `datetime_listed` DESC";

$result = mysqli_query($conn, $sqlQuery);

if (!$result) {
    die('Error getting data from database: ' . mysqli_error($conn));
}

$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Convert the data array to JSON
$jsonData = json_encode($data);

// Output the JSON
echo $jsonData;

// Close the connection
mysqli_close($conn);
?>
