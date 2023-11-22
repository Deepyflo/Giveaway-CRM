<?php

function getUserInfoCryptedAdmin () {
    require_once "config/database.php";
    require_once __DIR__ . '/../vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $db = Database::getInstance();
    $conn = $db->getConnection();

    $secret = $_ENV['SECRET_KEY'];

    $query = "SELECT id, uuid, name, firstname, email, AES_DECRYPT(street, '$secret') AS street, AES_DECRYPT(house_number, '$secret') AS house_number, AES_DECRYPT(box, '$secret') AS box, AES_DECRYPT(zipcode, '$secret') AS zipcode, AES_DECRYPT(city, '$secret') AS city, AES_DECRYPT(phone, '$secret') AS phone, completed FROM users";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        return $result;
    } else {
        return '';
    }
}