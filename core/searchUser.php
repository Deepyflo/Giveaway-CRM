<?php

require_once "config/database.php";
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$db = Database::getInstance();
$conn = $db->getConnection();

$secret = $_ENV['SECRET_KEY'];

$param = $_POST['param'];

$query = "SELECT id, uuid, name, firstname, email, AES_DECRYPT(street, '$secret') AS street, AES_DECRYPT(house_number, '$secret') AS house_number, AES_DECRYPT(box, '$secret') AS box, AES_DECRYPT(zipcode, '$secret') AS zipcode, AES_DECRYPT(city, '$secret') AS city, AES_DECRYPT(phone, '$secret') AS phone, completed FROM users";

$query .= ' ' . $param;

$query = str_replace('$secret', $secret, $query);

$result = $conn->query($query);

if ($result->num_rows > 0) {
    $return = "";
    while ($data = $result->fetch_assoc()) {
        $return .= $data["id"] . "|" . $data["uuid"] . "|" . $data["name"] . "|" . $data["firstname"] . "|" . $data["email"] . "|" . $data["street"] . "|" . $data["house_number"] . "|" . $data["box"] . "|" . $data["zipcode"] . "|" . $data["city"] . "|" . $data["phone"] . "|" . $data["completed"] . "\n";
    }
    echo $return;
} else {
    echo 'Not found in the database';
    die;
}