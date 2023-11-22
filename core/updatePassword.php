<?php
require_once "config/database.php";
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$db = Database::getInstance();
$conn = $db->getConnection();

$secret = $_ENV['SECRET_KEY'];

$token = $_POST['token'];
$password = $_POST['password'];

$query = "UPDATE admin SET reset_token = null, password = AES_ENCRYPT(?, '$secret') WHERE reset_token = ?";

$stmt = $conn->prepare($query);

if ($stmt === false) {
    die("Erreur de préparation de la requête : " . $conn->error);
}

$stmt->bind_param("ss", $password, $token);

if ($stmt->execute()) {
    echo "Données mises à jour avec succès.";
} else {
    echo "Erreur lors de la mise à jour des données : " . $stmt->error;
}

$stmt->close();
?>
