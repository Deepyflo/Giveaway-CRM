<?php
    require_once "config/database.php";
    require_once __DIR__ . '/../vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $db = Database::getInstance();
    $conn = $db->getConnection();

    $secret = $_ENV['SECRET_KEY'];

    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT id, username, AES_DECRYPT(password, '$secret') AS password FROM admin WHERE username = '$username'";
    $data = $conn->query($query);
    
    if ($data->num_rows > 0) {
    
        $result = $data->fetch_assoc();
    
        if ($result['password'] == $password) {
            echo $result['id'];
        } else {
            echo 'wrong password';
            die;
        }
    } else {
        echo 'User not found';
        die;
    }