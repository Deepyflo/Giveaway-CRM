<?php
    require_once "config/database.php";
    require_once __DIR__ . '/../vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $db = Database::getInstance();
    $conn = $db->getConnection();

    function getRandomString($length = 50) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $string = '';
    
        for ($i = 0; $i < $length; $i++) {
            $string .= $characters[mt_rand(0, strlen($characters) - 1)];
        }
    
        return $string;
    }
    
    
    $secret = $_ENV['SECRET_KEY'];
    
    $username = $_POST['username'];
    
    $query = "SELECT username FROM admin WHERE username = '$username'";
    $data = $conn->query($query);
    
    if ($data->num_rows > 0) {
        
        $result = $data->fetch_assoc();
        
        if ($result['username'] == $username) {
            echo 'true' . '|' . getRandomString();
            die;
        }
    } else {
        echo 'false';
        die;
    }