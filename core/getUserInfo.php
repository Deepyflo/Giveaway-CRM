<?php

function getUserInfo ($uuid) {
    require_once "config/database.php";

    $db = Database::getInstance();
    $conn = $db->getConnection();

    $query = "SELECT * FROM users WHERE UUID = $uuid";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        return $result;
    } else {
        return '';
    }
}