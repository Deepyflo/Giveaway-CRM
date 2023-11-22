import $ from 'jquery';
import { createAdvanceQuery } from "./queryBinders";
import Swal from 'sweetalert2';

const init = () => {
    let fields = "";

    const fillSelectorsAdvanced = () => {
        $.ajax({
            url: '../../core/getColumns.php',
            type: 'POST',
            success: (result) => {
                document.querySelector(".filterColumn").innerHTML += result;
                fields = document.querySelector(".advanceFilter_container__settings-columns--query .row");
            }
        });
    }

    const removeRowParams = (e) => {
        const row = e.target.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }

    const addFilterParams = () => {
        const queryContainer = document.querySelector(".advanceFilter_container__settings-columns--query");
        if (fields) {
            const clonedFields = fields.cloneNode(true); // Cloner l'élément
            clonedFields.querySelector('.filterValue').value = '';
            clonedFields.querySelector('.includeSwitch').querySelector('.toggle-checkbox').checked = false;
            clonedFields.querySelector('.row_minus').addEventListener('click', (e) => {
                removeRowParams(e);
            });
            queryContainer.appendChild(clonedFields); // Ajouter le clone à la zone de requête
        }
    }

    (() => {
        fillSelectorsAdvanced();
    })();

    $('#addParams').on('click', () => {
        addFilterParams();
    });

    $('#btnSaveAdvanceFilter').on('click', () => {
        if ($('#advanceFilterName').val() !== '') {
            const name = $('#advanceFilterName').val();

            if (localStorage.getItem("filters") === null) {
                localStorage.setItem("filters", JSON.stringify([]));
            }

            let filters = JSON.parse(localStorage.getItem("filters"));
            const temp = {name, 'query' : createAdvanceQuery()};
            filters.push(temp);
            localStorage.setItem("filters", JSON.stringify(filters)); 
            $('#filterName').val('');
            location.reload();
        } else {
            Swal.fire({
                title: 'Please take a name for your filter',
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                position: 'top-right',
                icon: 'error',
                showConfirmButton: false,
                customClass:'swal-height',
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