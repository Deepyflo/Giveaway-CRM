<?php

function getAdmins() {
    require_once "config/database.php";

    $db = Database::getInstance();
    $conn = $db->getConnection();

    $query = "SELECT * FROM admin";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        return $result;
    } else {
        return '';
    }
}