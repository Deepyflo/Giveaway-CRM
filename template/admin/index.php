<?php

require_once './core/getUserInfoCryptedAdmin.php';

$result = getUserInfoCryptedAdmin();
?>

<main>
    <section class="section center">
        <div class="inner">
            <div class="database__container">
                <div class="export_container">
                    <span>Export database</span>
                    <div class="buttonExport">
                        <button id="exportComma">
                            Comma
                        </button>
                        <button id="exportSemicolon">
                            Semicolon
                        </button>
                    </div>
                </div>
                <div class="import_container">
                    <span>Import database</span>
                    <div class="buttonImport">
                        <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="file" class="importCSV" id="importCSV">
                        <label for="importCSV" class="importLabel" id="importLabel">Choose a CSV file</label>
                        <select name="delimiter" id="importDelimiter">
                            <option value=",">Comma</option>
                            <option value=";">SemiColon</option>
                        </select>
                        <button id="btnImport">
                            Import
                        </button>
                    </div>
                </div>
                <div class="settingsImport_container hidden">
                    <span>Import settings</span>
                    <div>
                        <label for="selectName">Column name : </label>
                        <select name="selectName" id="selectName">
                            <option disabled selected hidden value="99">--> Select me <--</option>
                        </select>
                    </div>
                    <div>
                        <label for="selectFirstname">Column firstname : </label>
                        <select name="selectFirstname" id="selectFirstname">
                            <option disabled selected hidden value="99">--> Select me <--</option>
                        </select>
                    </div>
                    <div>
                        <label for="selectEmail">Column email : </label>
                        <select name="selectEmail" id="selectEmail">
                            <option disabled selected hidden value="99">--> Select me <--</option>
                        </select>
                    </div>
                    <button id="btnUpload">
                        Upload
                    </button>
                </div>
                <div class="settingsFilter_container">
                    <span>Filter memory</span>
                    <div class="settingsFilter_container__list">

                    </div>
                    <div class="settingsFilter_container__input">
                        <input type="text" name="filterName" id="filterName">
                        <button id="btnSaveFilter">
                            Save filter
                        </button>
                    </div>
                </div>
            </div>
            <div class="advanceFilter_container">
                <div class="advanceFilter_container__input">
                    <span>Advance filter</span>
                    <input type="text" name="advanceFilterName" id="advanceFilterName">
                    <button id="btnSaveAdvanceFilter">
                        Save filter
                    </button>
                </div>
                <div class="advanceFilter_container__settings">
                    <div class="advanceFilter_container__settings-columns">
                        <div class="advanceFilter_container__settings-columns--query">
                            <div class="row">
                                <label class="switchContainer andOrSwitch">
                                    <span class="toggle-label-left">And</span>
                                    <input class="toggle-checkbox" type="checkbox">
                                    <div class="toggle-switch"></div>
                                    <span class="toggle-label-right">Or</span>
                                </label>
                                <select name="filterColumn" class="filterColumn">
                                    <option disabled selected hidden value="99">--> Select column <--</option>
                                </select>
                                <label class="switchContainer includeSwitch">
                                    <span class="toggle-label-left">Include</span>
                                    <input class="toggle-checkbox" type="checkbox">
                                    <div class="toggle-switch"></div>
                                    <span class="toggle-label-right">Exclude</span>
                                </label>
                                <input type="text" name="filterValue" class="filterValue" placeholder="value">
                                <div class="row_minus">
                                    <img src="../../src/assets/img/minus.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="advanceFilter_container__settings-columns">
                        <div id="addParams" class="advanceFilter_container__settings-columns--add">
                            <img src="../../src/assets/img/add.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <table class="usersData" cellspacing="0" cellpadding="0">
                <thead class="usersData_head">
                    <tr class="usersData_head__row">
                        <td class="usersData_head__row-item">
                            <div id="head-uuid">
                                UUID&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-name">
                                Name&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-firstname">
                                Firstname&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-email">
                                Email&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-street">
                                Street&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-house_number">
                                House number&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-box">
                                Box&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-zipcode">
                                Zipcode&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-city">
                                City&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                        <td class="usersData_head__row-item">
                            <div id="head-phone">
                                Phone&nbsp;<span class="sort_icon"><?php include './src/assets/img/sort_arrow.svg' ?></span>
                            </div>
                        </td>
                    </tr>
                    <tr class="usersData_head__row">
                        <td class="usersData_head__row-item"><input type="text" name="search_uuid" class="search" id="search_uuid"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_name" class="search" id="search_name"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_firstname" class="search" id="search_firstname"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_email" class="search" id="search_email"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_street" class="search" id="search_street"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_house" class="search" id="search_house"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_box" class="search" id="search_box"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_zip" class="search" id="search_zip"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_city" class="search" id="search_city"></td>
                        <td class="usersData_head__row-item"><input type="text" name="search_phone" class="search" id="search_phone"></td>
                    </tr>
                </thead>
                <tbody class="usersData_body">
                    <?php if ($result != '') { ?>
                        <?php while ($data = $result->fetch_assoc()) { ?>
                            <tr class="usersData_body__row completed_<?= $data['completed'] ?>">
                                <td class="usersData_body__row-item"><?= $data['uuid'] ?></td>
                                <td class="usersData_body__row-item"><?= $data['name'] ?></td>
                                <td class="usersData_body__row-item"><?= $data['firstname'] ?></td>
                                <td class="usersData_body__row-item"><?= $data['email'] ?></td>
                                <td class="usersData_body__row-item"><?= $data['street'] ?></td>
                                <td class="usersData_body__row-item"><?= $data['house_number'] ?></td>
                                <td class="usersData_body__row-item"><?= $data['box'] = (null) ? '&nbsp;' : $data['box']; ?></td>
                                <td class="usersData_body__row-item"><?= $data['zipcode'] ?></td>
                                <td class="usersData_body__row-item"><?= $data['city'] ?></td>
                                <td class="usersData_body__row-item"><?= $data['phone'] ?></td>
                            </tr>
                        <?php } ?>
                    <?php } else { ?>
                        <tr class="usersData_body__row">
                            <td class="usersData_body__row-item"> No register in Database</td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </section>
</main>