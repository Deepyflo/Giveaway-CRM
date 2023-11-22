<?php

require_once './getUserInfoCryptedAdmin.php';

try {
    $result = getUserInfoCryptedAdmin();
    $outputFile = '../export/export.csv';
    $delimiter = $_POST['delimiter'];

    // Ouvrez le fichier CSV en mode écriture
    $file = fopen($outputFile, 'w');

    // Écrivez l'en-tête avec les noms des colonnes
    $columnNames = [];
    while ($column = $result->fetch_field()) {
        $columnNames[] = $column->name;
    }
    fputcsv($file, $columnNames, $delimiter);

    // Écrivez les données dans le fichier CSV
    while ($row = $result->fetch_assoc()) {
        fputcsv($file, $row, $delimiter);
    }

    // Fermez le fichier CSV
    fclose($file);

    echo "Export CSV réussi.";
} catch (Exception $e) {
    echo "Erreur lors de l'export CSV : " . $e->getMessage();
}