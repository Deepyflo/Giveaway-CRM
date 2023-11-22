import $ from 'jquery';
import Swal from 'sweetalert2';

$('#btnAddUser').on('click', (e) => {
    e.preventDefault();

    const username = $('#inAddUsername').val();
    const email = $('#inAddEmail').val();

    $.ajax({
        type: 'POST',
        url: '../../core/checkEmail.php',
        data: {
            email
        },
        success: (result) => {
            if (result == '1') {
                Swal.fire({
                    title: 'Email already taken',
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
                })
            } else {
                
            }
        }
    })
})