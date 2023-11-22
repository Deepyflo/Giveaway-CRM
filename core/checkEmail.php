<?php
    require_once "config/database.php";
    require_once __DIR__ . '/../vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $db = Database::getInstance();
    $conn = $db->getConnection();

    $secret = $_ENV['SECRET_KEY'];

    $email = $_POST['email'];

    $query = "SELECT email FROM admin WHERE email = '$email'";
    $data = $conn->query($query);
    
    if ($data->num_rows > 0) {
    
        $result = $data->fetch_assoc();
    
        if ($result['email'] == $email) {
            echo true;
            die;
        }
    } else {
        echo false;
        die;
    }