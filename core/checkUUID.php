<?php
require_once "config/database.php";

function checkUUID($uuid) {
    $db = Database::getInstance();
    $conn = $db->getConnection();

    $query = "SELECT UUID FROM users WHERE UUID = $uuid";
    $result = $conn->query($query);
    
    if ($result->num_rows > 0) {
        return true;
    } else {
        return false;
    }
}
