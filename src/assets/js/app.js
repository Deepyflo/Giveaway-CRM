import '../scss/app.scss';
import Swal from 'sweetalert2';
import $ from 'jquery';

const phoneReg =
    /(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/;

$('#btnSubmit').on('click', (e) => {
    e.preventDefault();

    const firstname = document.getElementById('firstnameContent').innerText;
    const name = document.getElementById('nameContent').innerText;
    const email = document.getElementById('emailContent').innerText;
    const street = $('#inStreet').val();
    const number = $('#inNumber').val();
    const box = $('#inBox').val();
    const zip = $('#inZip').val();
    const city = $('#inCity').val();
    const phone = $('#inPhone').val();
    const uuid = document.getElementById('btnSubmit').dataset.uuid;

    if (street == '' || number == '' || zip == '' || city == '' || phone == '') {
        Swal.fire({
            title: 'Please fill all required field',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-right',
            icon: 'error',
            showConfirmButton: false,
            customClass: 'swal-height',
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        })    
    } else {
        if (testPhone()) {
            $.ajax({
                url: '../../core/addInfo.php',
                type: 'POST',
                data: {
                    street,
                    number,
                    box,
                    zip,
                    city,
                    phone,
                    uuid,
                },
                success: (result) => {
                    $.ajax({
                        url: '../../core/sendMail.php',
                        type: 'POST',
                        data: {
                            subject: 'Registered attendance',
                            username: firstname + ' ' + name,
                            email,
                            type: 'participation',
                        },
                        success: (result) => {
                            Swal.fire({
                                title: 'Success',
                                text: 'Entry registered, we will contact you if you are the winner. An confirmation email will be send to you.',
                                timer: 5000,
                                timerProgressBar: true,
                                icon: 'success',
                                customClass: 'swal-height',
                                didOpen: (toast) => {
                                    toast.addEventListener(
                                        'mouseenter',
                                        Swal.stopTimer
                                    );
                                    toast.addEventListener(
                                        'mouseleave',
                                        Swal.resumeTimer
                                    );
                                },
                            }).then(() => {
                                location.reload();
                            });
                        },
                    });
                },
            });
        }
    }
});

const testPhone = () => {
    const value = $('#inPhone').val();

    const result = phoneReg.exec(value);

    if (result == null) {
        Swal.close();
        Swal.fire({
            title: 'Please enter a good phone number (Belgium)',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            position: 'top-right',
            icon: 'error',
            showConfirmButton: false,
            customClass: 'swal-height',
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
        return false;
    } else {
        return true;
    }
};

$('#inPhone').keydown((e) => {
    if (
        e.key != '+' &&
        (e.key < 0 || e.key > 9) &&
        e.key != 'Backspace' &&
        e.key != ' '
    ) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.cancelBubble = false;
    }
});
