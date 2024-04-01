<?php

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        die('POST request method required');
    }

    if (empty($_FILES)) {
        die('$_FILES is empty - is file_uploads set to "Off" in php.ini?');
    }

    $name = $_POST['name'] ?? die("Name is missing!");
    $price = $_POST['price'] ?? die("Price is missing!");
    $category = $_POST['category'] ?? die("Category is missing!");
    $status = $_POST['status'] ?? die("Status is missing!");    
    
    if ($_FILES["image"]["error"] !== UPLOAD_ERR_OK) {

        switch ($_FILES["image"]["error"]) {
            case UPLOAD_ERR_PARTIAL:
                die('File only partially uploaded');
                break;
            case UPLOAD_ERR_NO_FILE:
                die('No file was uploaded');
                break;
            case UPLOAD_ERR_EXTENSION:
                die('File upload stopped by a PHP extension');
                break;
            case UPLOAD_ERR_FORM_SIZE:
                die('File exceeds MAX_FILE_SIZE in the HTML form');
                break;
            case UPLOAD_ERR_INI_SIZE:
                die('File exceeds upload_max_filesize in php.ini');
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                die('Temporary folder not found');
                break;
            case UPLOAD_ERR_CANT_WRITE:
                die('Failed to write file');
                break;
            default:
                die('Unknown upload error');
                break;
        }
    }

    // Reject uploaded file larger than 1MB
    if ($_FILES["image"]["size"] > 1048576*20) {
        die('File too large (max 20MB)');
    }

    // Use fileinfo to get the mime type
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime_type = $finfo->file($_FILES["image"]["tmp_name"]);

    $mime_types = ["image/gif", "image/png", "image/jpeg"];
            
    if ( ! in_array($_FILES["image"]["type"], $mime_types)) {
        die("Invalid file type");
    }

    // Replace any characters not \w- in the original filename
    $pathinfo = pathinfo($_FILES["image"]["name"]);

    $base = $pathinfo["filename"];

    $base = preg_replace("/[^\w-]/", "_", $base);

    $filename = $base . "." . $pathinfo["extension"];

    $destination = __DIR__ . "/uploads/" . $filename;

    // Add a numeric suffix if the file already exists
    $dupeCount = 1;

    while (file_exists($destination)) {

        $filename = $base . "($dupeCount)." . $pathinfo["extension"];
        $destination = __DIR__ . "/uploads/" . $filename;
        $dupeCount++;
    }

    if ( ! move_uploaded_file($_FILES["image"]["tmp_name"], $destination)) {
        die("Can't move uploaded file");
    }

    echo "File uploaded successfully.";

    $host = 'localhost';
    $username = 'root';
    $password = '';
    $dbName = 'kumaprints';

    $conn = mysqli_connect($host, $username, $password, $dbName);

    if (mysqli_connect_error()) {
        die('Error connecting to database' . mysqli_error_string());
    }

    $sqlQuery = "INSERT INTO `listings` (`name`, `category`, `price`, `status`, `image_path`) VALUES ('$name', '$category', $price, '$status', '/uploads/$filename')";

    $result = mysqli_query($conn, $sqlQuery);

    if (!$result) { die('Error inserting data into database'); }

    echo "Listing Uploaded!!!";

?>