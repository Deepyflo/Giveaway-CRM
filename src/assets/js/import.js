import $ from 'jquery';
import swal from 'sweetalert2';

const init = () => {

    const data = [];

    const fileInput = document.getElementById('importCSV');
    const fileLabel = document.getElementById('importLabel');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            fileLabel.innerText = `Selected file: ${fileName}`;
        } else {
            fileLabel.innerText = 'Choose a CSV file';
        }
    });

    $('#btnImport').on('click', () => {
        const fileInput = document.getElementById('importCSV');
        const separator = document.getElementById('importDelimiter').value;

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const csvData = e.target.result;
                const lines = csvData.split('\n');

                lines.forEach((line) => {
                    const values = line.split(separator);
                    data.push(values);
                });

                fillSelector(data);
            };

            reader.readAsText(file);

            document.querySelector('.settingsImport_container').classList.remove('hidden');
        }
    });

    const fillSelector = (...data) => {
        const columns = data[0][0];
        const selName = document.getElementById('selectName');
        const selFirstname = document.getElementById('selectFirstname');
        const selEmail = document.getElementById('selectEmail');

        const createOption = (id, text) => {
            const option = document.createElement('option');
            option.innerText = text;
            option.value = id;
            return option;
        };
        
        columns.forEach((column, index) => {
            const optionName = createOption(`name_${index}`, column);
            const optionFirstname = createOption(`firstname_${index}`, column);
            const optionEmail = createOption(`email_${index}`, column);
        
            selName.appendChild(optionName);
            selFirstname.appendChild(optionFirstname);
            selEmail.appendChild(optionEmail);
        });
    };

    $('#btnUpload').on('click', () => {
        const columnName = document.getElementById('selectName').value;
        const columnFirstname = document.getElementById('selectFirstname').value;
        const columnEmail = document.getElementById('selectEmail').value;

        if (
            columnName == columnFirstname ||
            columnName == columnEmail ||
            columnFirstname == columnEmail
        ) {
            swal.fire({
                title: 'All dropdown will be with different value',
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
            if (
                columnEmail == '99' ||
                columnFirstname == '99' ||
                columnName == '99'
            ) {
                swal.fire({
                    title: 'Please fill select all columns',
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
                const jsonData = JSON.stringify(data);

                $.ajax({
                    type: 'POST',
                    url: '../../core/insertCSV.php',
                    data: {
                        data: jsonData,
                        columnName,
                        columnFirstname,
                        columnEmail,
                    },
                    success: (result) => {
                        const content = result.split(',');
                        if (content[1] == '') {
                            const count = parseInt(content[0]);
                            swal.fire({
                                title: `${count} users added in database !`,
                                toast: true,
                                timer: 3000,
                                timerProgressBar: true,
                                position: 'top-right',
                                icon: 'success',
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
                            }).then(() => {
                                location.reload();
                            });
                        } else {
                            const count = parseInt(content[0]);
                            let reject = content[1].split('|');
                            reject.pop();

                            swal.fire({
                                title: `${count} users added in database except these mail :`,
                                text: JSON.stringify(reject),
                                toast: true,
                                position: 'top-right',
                                icon: 'warning',
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
                                location.reload();
                            });
                        }
                    },
                });
            }
        }
    });
}



(() => {
    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        cookie = cookie.split('=');

        if (cookie[0] === 'adminID') {
            init();
        }
    });
})();