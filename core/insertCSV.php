<?php
require_once "config/database.php";

$db = Database::getInstance();
$conn = $db->getConnection();

$data = json_decode(stripslashes($_POST['data']));
$columnName = $_POST['columnName'];
$columnFirstname = $_POST['columnFirstname'];
$columnEmail = $_POST['columnEmail'];

$reject = "";
$count = 0;

foreach ($data as $row) {

    if ($row[$columnFirstname] != 'firstname') {

        //* Test if email is already in DB
        $querySelect = "SELECT email FROM users WHERE email = '$row[$columnEmail]'";
        $result = $conn->query($querySelect);

        if ($result === false) {
            echo $conn->error;
            die;
        } else {
            $present = $result->fetch_assoc();
            if ($present != null) {
                $reject .= $present['email'] . '|';
            } else {
                //* Insert user not already in DB
                $query = "INSERT INTO users (uuid, name, firstname, email) VALUES (?, ?, ?, ?)";

                $stmt = $conn->prepare($query);

                if ($stmt === false) {
                    die("Erreur de préparation de la requête : " . $conn->error);
                }

                $uuidGenerated = mt_rand(100000,999999); 

                $stmt->bind_param("ssss", $uuidGenerated, $row[$columnName], $row[$columnFirstname], $row[$columnEmail]);
                if($stmt->execute()) {
                    $count++;
                }
                $stmt->close();
            }
        }
    }
}

echo $count . ',' . $reject;