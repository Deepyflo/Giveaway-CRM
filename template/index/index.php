<main>
    <section class="center section">
        <div class="inner">
            <?php
                require './core/getUserInfoCrypted.php';

                $data = getUserInfoCrypted($_GET['UUID']);

                if ($data != '') {
                    while ($user = $data->fetch_assoc()) {

                        if ($user['completed'] == 0) {
                            ?>
                            <div class="intro">
                                <div class="content">
                                    <p>Congratulations <span><?= $user['firstname'] ?> <?= $user['name'] ?></span>! You've been selected to take part in our big giveaway to win a private show with a clown!</p>
                                    <p>To enter, simply enter your postal address and telephone number so we can contact you if you win.</p>
                                    <p class="disclaimer">if any information is wrong, please contact us quickly!</p>
                                    <div class="form">
                                        <p>Firstname: <span id="firstnameContent"><?= $user['firstname'] ?></span></p>
                                        <p>Name: <span id="nameContent"><?= $user['name'] ?></span></p>
                                        <p>Email: <span id="emailContent"><?= $user['email'] ?></span></p>
                                        <form action="javascript:void(0)">
                                            <input type="text" name="street" id="inStreet" placeholder="Street*" value="<?= $user['street'] ?>" required>
                                            <input type="text" name="house_number" id="inNumber" placeholder="House number*" value="<?= $user['house_number'] ?>" required>
                                            <input type="text" name="box" id="inBox" placeholder="Box" value="<?= $user['box'] ?>">
                                            <input type="zipcode" name="zipcode" id="inZip" placeholder="Zipcode*" value="<?= $user['zipcode'] ?>" required>
                                            <input type="text" name="city" id="inCity" placeholder="City*" value="<?= $user['city'] ?>" required>
                                            <input type="text" name="phone" id="inPhone" placeholder="Phone number*" value="<?= $user['phone'] ?>" onchange="testPhone()" required>
                                            <button id="btnSubmit" data-uuid="<?= $_GET['UUID'] ?>">
                                                Participate
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <?php
                        } else {
                            ?>
                            <div class="modal_info modal">
                                <img src="../../src/assets/img/see_you.gif" alt="">
                                <p>You've already participed to this giveaway !</p>
                            </div>
                            <?php
                        }
                    }
                } else {
                    ?>
                    <div class="modal_error modal">
                        <p>An error occured</p>
                    </div>
                    <?php
                }
            ?>
        </div>
    </section>
</main>