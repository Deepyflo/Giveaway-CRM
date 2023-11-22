<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Migration BSA</title>
</head>

<body>
    <header>
        <section class="section center">
            <div class="inner">
                <h1>Giveaway</h1>
                <?php if (isset($_COOKIE['adminID'])) { ?>
                    <nav>
                        <div class="icons">
                            <a class="iconHome" href="/admin">
                                <img src="../src/assets/img/home.svg" alt="">
                            </a>
                            <a class="iconAddUser" href="/add-user">
                                <img src="../src/assets/img/user-add.svg" alt="">
                            </a>
                            <a id="btnLogout" class="iconLogout">
                                <img src="../src/assets/img/logout.svg" alt="">
                            </a>
                        </div>
                    </nav>
                <?php } else { ?>
                    <nav>
                        <div class="icons">
                            <a class="iconLogin" href="/admin">
                                <img src="../src/assets/img/login.svg" alt="">
                            </a>
                        </div>
                    </nav>
                <?php } ?>
            </div>
        </section>
    </header>