<?php

require_once "config/database.php";

$db = Database::getInstance();
$conn = $db->getConnection();

$query = "SHOW COLUMNS FROM users";

$result = $conn->query($query);

$return = '';

if ($result->num_rows > 0) {
    while ($data = $result->fetch_assoc()) {
        if ($data['Field'] !== 'id' && $data['Field'] !== 'created_at' && $data['Field']!== 'updated_at') {
            $return .= '<option value="'. $data['Field']. '">'. $data['Field']. '</option>';
        }
    }
    echo $return;
}