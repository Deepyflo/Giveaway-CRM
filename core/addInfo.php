<?php
require_once "config/database.php";
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$db = Database::getInstance();
$conn = $db->getConnection();

$secret = $_ENV['SECRET_KEY'];

$uuid = $_POST['uuid'];
$street = $_POST['street'];
$number = $_POST['number'];
$box = $_POST['box'];
$zip = $_POST['zip'];
$city = $_POST['city'];
$phone = $_POST['phone'];

if ($box == "") {
    $box = null;
}

$query = "UPDATE users SET street = AES_ENCRYPT(?, '$secret'), house_number = AES_ENCRYPT(?, '$secret'), box = AES_ENCRYPT(?, '$secret'), zipcode = AES_ENCRYPT(?, '$secret'), city = AES_ENCRYPT(?, '$secret'), phone = AES_ENCRYPT(?, '$secret'), completed = 1 WHERE uuid = '$uuid'";

$stmt = $conn->prepare($query);

if ($stmt === false) {
    die("Erreur de préparation de la requête : " . $conn->error);
}

$stmt->bind_param("ssssss", $street, $number, $box, $zip, $city, $phone);

if ($stmt->execute()) {
    echo "Données mises à jour avec succès.";
} else {
    echo "Erreur lors de la mise à jour des données : " . $stmt->error;
}

$stmt->close();
?>
