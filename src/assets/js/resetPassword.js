import $ from 'jquery';
import swal from 'sweetalert2';

$('#btnForgot').on('click', () => {
    let check = false;
    $('#inEmail').removeClass('error');
    $('#inUsername').removeClass('error');

    if ($('#inEmail').val() === '') {
        check = true;
        $('#inEmail').addClass('error');
    }
    if ($('#inUsername').val() === '') {
        check = true;
        $('#inUsername').addClass('error');
    }

    if (!check) {
        const email = $('#inEmail').val();
        const username = $('#inUsername').val();

        $.ajax({
            url: '../../core/checkEmail.php',
            type: 'POST',
            data: {
                email,
            },
            success: (result) => {
                if (result) {
                    $.ajax({
                        url: '../../core/checkUsername.php',
                        type: 'POST',
                        data: {
                            username,
                        },
                        success: (result) => {
                            const res = result.split('|');
                            const token = res[1];
                            if (res[0] == 'true') {
                                $.ajax({
                                    url: '../../core/sendMail.php',
                                    type: 'POST',
                                    data: {
                                        subject: 'Password forgot?',
                                        username,
                                        email,
                                        type: 'password',
                                        token: token,
                                    },
                                    success: (result) => {
                                        swal.fire({
                                            title: 'Success',
                                            text: 'An email has been sent to your email address with a password recovery link.',
                                            timer: 5000,
                                            timerProgressBar: true,
                                            icon: 'success',
                                            customClass: 'swal-height',
                                            didOpen: (toast) => {
                                                toast.addEventListener(
                                                    'mouseenter',
                                                    swal.stopTimer
                                                );
                                                toast.addEventListener(
                                                    'mouseleave',
                                                    swal.resumeTimer
                                                );
                                            },
                                        }).then(() => {
                                            $.ajax({
                                                url: '../../core/updateToken.php',
                                                type: 'POST',
                                                data: {
                                                    token,
                                                    username,
                                                },
                                                success: (result) => {
                                                    // console.log(result);
                                                    location.reload();
                                                },
                                            });
                                        });
                                    },
                                });
                            } else {
                                swal.fire({
                                    title: 'Username not found',
                                    toast: true,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    position: 'top-right',
                                    icon: 'error',
                                    showConfirmButton: false,
                                    customClass: 'swal-height',
                                    didOpen: (toast) => {
                                        toast.addEventListener(
                                            'mouseenter',
                                            swal.stopTimer
                                        );
                                        toast.addEventListener(
                                            'mouseleave',
                                            swal.resumeTimer
                                        );
                                    },
                                });
                            }
                        },
                    });
                } else {
                    swal.fire({
                        title: 'Email not found',
                        toast: true,
                        timer: 3000,
                        timerProgressBar: true,
                        position: 'top-right',
                        icon: 'error',
                        showConfirmButton: false,
                        customClass: 'swal-height',
                        didOpen: (toast) => {
                            toast.addEventListener(
                                'mouseenter',
                                swal.stopTimer
                            );
                            toast.addEventListener(
                                'mouseleave',
                                swal.resumeTimer
                            );
                        },
                    });
                }
            },
        });
    }
});

$('#btnReset').on('click', () => {
    const password = $('#inResetPassword').val();
    const confirmPassword = $('#inCheckResetPassword').val();
    $('#inCheckResetPassword').removeClass('error');

    if (password !== confirmPassword) {
        $('#inCheckResetPassword').addClass('error');
        swal.fire({
            title: 'Passwords do not match',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-right',
            icon: 'error',
            showConfirmButton: false,
            customClass: 'swal-height',
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer);
                toast.addEventListener('mouseleave', swal.resumeTimer);
            },
        });
    } else {
        const get = location.href.split('?')[1].split('&');
        console.log(get);
        let token = '';
        get.forEach((item) => {item.split('=')[0] == 'token' ? token = item.split('=')[1] : null});
        console.log(token);
        $.ajax({
            url: '../../core/updatePassword.php',
            type: 'POST',
            data: {
                password,
                token,
            },
            success: (result) => {
                swal.fire({
                    title: 'Password updated',
                    toast: true,
                    timer: 3000,
                    timerProgressBar: true,
                    position: 'top-right',
                    icon: 'success',
                    showConfirmButton: false,
                    customClass: 'swal-height',
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', swal.stopTimer);
                        toast.addEventListener('mouseleave', swal.resumeTimer);
                    },
                }).then(() => {
                    location.href = '/admin';
                })
            },
        });
    }
});
