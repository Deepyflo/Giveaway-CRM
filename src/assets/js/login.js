import $ from 'jquery';

$('#btnLogin').on('click', () => {
    const username = $('#inUsername').val();
    const password = $('#inPassword').val();

    const inUsername = document.getElementById('inUsername');
    const inPassword = document.getElementById('inPassword');

    inUsername.classList.remove('error');
    inPassword.classList.remove('error');
    
    $.ajax({
        url: '../../core/loginAdmin.php',
        type: 'POST',
        data: {
            username,
            password
        },
        success: (result) => {
            const resInt = parseInt(result);
            switch (isNaN(resInt)) {
                case true:
                    switch (result) {
                        case 'wrong password':
                            inPassword.classList.add('error');
                            break;
                            
                        case 'User not found':
                            inUsername.classList.add('error');
                            break;
                        default:
                            break;
                    }
                break;

                case false:
                    document.cookie = `adminID=${resInt}`;
                    location.href = '/admin';
                    break;

                default:
                    break;
            }
        }
    })
})

$('#btnLogout').on('click', () => {
    $.ajax({
        url: '../../core/logoutAdmin.php',
        type: 'POST',
        success: (result) => {
            if (result) {
                location.href = '/admin';
            }
        }
    })
})