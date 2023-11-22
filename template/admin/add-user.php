<?php
    require_once './core/getAdmin.php';

    $admins = getAdmins();
?>

<main>
    <section class="section center">
        <div class="inner">
            <div class="addUser_container">
                <form class="addForm" action="javascript:void(0)" method="post">
                    <h2>Add user</h2>
                    <div class="form-group">
                        <input type="email" name="email" id="inAddEmail" placeholder="Enter Email" required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="username" id="inAddUsername" placeholder="Enter Username" required>
                    </div>
                    <button id="btnAddUser" type="button">Add User</button>
                </form>
                <div class="users">
                    <h2>Users</h2>
                    <div class="users_list">
                        <?php while ($admin = $admins->fetch_assoc()) {?>
                            <div class="users_list__item">
                                <div class="users_list__item--username"><?= $admin['username']?> | <?= $admin['email']?> <span class="activeBullet <?= $admin['activated'] = (1) ? 'activated' : ''?>">&bull;</span></div>
                                <div class="users_list__item--action" id="removeUser" data-id="<?= $admin['id'] ?>">
                                    <img src="../../src/assets/img/user-remove.svg" alt="">
                                </div>
                            </div>
                        <?php }?>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>