<?php

    header("Access-Control-Allow-Origin: *");

    if (isset($_POST['operation']) && isset($_POST['key']) && isset($_POST['id']) /*&& $_POST['key'] == $key*/) {

        $host = 'localhost';
        $username = 'root';
        $password = '';
        $dbName = 'kumaprints';
        
        $conn = mysqli_connect($host, $username, $password, $dbName);

        if (mysqli_connect_error()) {
            die('Error connecting to database' . mysqli_connect_error());
        }

        $operation = $_POST['operation'];

        if ($operation === 'update') {

            $name = (isset($_POST['name'])) ? $_POST['name'] : '';
            $category = $_POST['category'];
            $price = $_POST['price'];
            $status = $_POST['status'];
            
            $sqlQuery= "UPDATE `listings` \n"
            . "SET `name` = $name, `category` = $category, `price` = $price, `status` = $status\n"
            . "WHERE `id` = $id;";
            
            $result = mysqli_query($conn, $sqlQuery);
            
            if (!$result) {
                die('Error getting data from database: ' . mysqli_error($conn));
            }
        }else if ($operation === 'delete') {
            $sqlQuery= "DELETE FROM `listings` WHERE `id` = $id";
        }else {
            die("Error: Invalid Operation");
        }

    }


?>
