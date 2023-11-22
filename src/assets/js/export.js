import $ from 'jquery';
import swal from'sweetalert2';

const handleExport = (delimiter) => {
    $.ajax({
        url: '../../core/exportToCSV.php',
        type: 'POST',
        data: {
            delimiter: delimiter,
        },
        success: (result) => {
            if (result.includes('réussi')) {
                swal.fire({
                    title: 'Database exported !',
                    icon: 'success',
                    timer: 2000,
                });
            }
        },
    });
};

$('#exportComma').on('click', () => {
    handleExport(',');
});

$('#exportSemicolon').on('click', () => {
    handleExport(';');
});
