<?php
require_once "config/database.php";

function checkToken($token) {
    $db = Database::getInstance();
    $conn = $db->getConnection();

    $query = "SELECT reset_token FROM admin WHERE reset_token = '$token'";
    $result = $conn->query($query);
    
    if ($result->num_rows > 0) {
        return true;
    } else {
        return false;
    }
}