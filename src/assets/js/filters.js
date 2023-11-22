import $ from 'jquery';
import { createQuery } from "./queryBinders";

const fillFilters = () => {
    const filters = JSON.parse(localStorage.getItem('filters'));

    if (filters !== null) {
        const listContainer = document.querySelector('.settingsFilter_container__list');
        
        listContainer.innerHTML = '';
        
        filters.forEach((filter) => {
            const div = document.createElement('div');
            div.classList.add('settingsFilter_container__list-item');
            
            div.innerHTML = `
            <div class="settingsFilter_container__list-item--name">${filter.name}</div>
            <div class="settingsFilter_container__list-item--execute"><img id="${filter.name}" src='../../src/assets/img/play.svg'></div>
            <div class="settingsFilter_container__list-item--delete"><img id="${filter.name}" src='../../src/assets/img/trash.svg'></div>
            `;
            
            listContainer.appendChild(div);

            $('.settingsFilter_container__list-item--delete').on('click', (e) => {
                const id = e.target.id;
                let filters = JSON.parse(localStorage.getItem("filters"));
                const newFilters = [];
                filters.forEach((filter) => {
                    if (filter.name !== id) {
                        newFilters.push({name: filter.name, query: filter.query});
                    }
                });
                localStorage.setItem("filters", JSON.stringify(newFilters));
                // location.reload();
                fillFilters();
            })
        });
    }
}

(() => {
    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        cookie = cookie.split('=');

        if (cookie[0] === 'adminID') {
            fillFilters();
        }
    });
})();

$('.search').on('change', (e) => {
    let param = createQuery();

    $.ajax({
        type: 'POST',
        url: '../../core/searchUser.php',
        data: {
            param,
        },
        success: (result) => {
            document.querySelector('.usersData_body').innerHTML = '';

            if (result == 'Not found in the database') {
                document.querySelector('.usersData_body').innerHTML =
                    '<tr class="usersData_body__row"><td class="usersData_body__row-item"> Not found in Database</td></tr>';
            } else {
                let data = result.split('\n');
                let users = [];
                for (const row of data) {
                    users.push(row.split('|'));
                }
                users.pop();

                users.forEach((user) => {
                    const tr = document.createElement('tr');
                    tr.setAttribute('class', 'usersData_body__row');
                    tr.classList.add(`completed_${user[11]}`);
                    tr.innerHTML = `
                        <td class="usersData_body__row-item">${user[1]}</td>
                        <td class="usersData_body__row-item">${user[2]}</td>
                        <td class="usersData_body__row-item">${user[3]}</td>
                        <td class="usersData_body__row-item">${user[4]}</td>
                        <td class="usersData_body__row-item">${user[5]}</td>
                        <td class="usersData_body__row-item">${user[6]}</td>
                        <td class="usersData_body__row-item">${user[7]}</td>
                        <td class="usersData_body__row-item">${user[8]}</td>
                        <td class="usersData_body__row-item">${user[9]}</td>
                        <td class="usersData_body__row-item">${user[10]}</td>
                        `;
                    document.querySelector('.usersData_body').appendChild(tr);
                });
            }
        },
    });
});

$('.usersData_head__row-item div').on('click', (e) => {
    const icon = e.target.querySelector('.sort_icon');
    document.querySelectorAll('.usersData_head__row-item div').forEach((item) => {
        const otherItem = item.querySelector('.sort_icon');
        if (otherItem == icon) {
            if (icon.classList.contains('visible') && !icon.classList.contains('rotate')) {
                icon.classList.add('rotate');
            } else {
                icon.classList.add('visible');
                icon.classList.remove('rotate');
            }
        } else {
            otherItem.classList.remove('visible');
            otherItem.classList.remove('rotate');
        }
    });

    let param = createQuery();

    $.ajax({
        type: 'POST',
        url: '../../core/searchUser.php',
        data: {
            param,
        },
        success: (result) => {
            document.querySelector('.usersData_body').innerHTML = '';

            if (result == 'Not found in the database') {
                document.querySelector('.usersData_body').innerHTML = '<tr class="usersData_body__row"><td class="usersData_body__row-item"> Not found in Database</td></tr>';
            } else {
                let data = result.split('\n');
                let users = [];
                for (const row of data) {
                    users.push(row.split('|'));
                }
                users.pop();

                users.forEach((user) => {
                    const tr = document.createElement('tr');
                    tr.setAttribute('class', 'usersData_body__row');
                    tr.classList.add(`completed_${user[11]}`);
                    tr.innerHTML = `
                        <td class="usersData_body__row-item">${user[1]}</td>
                        <td class="usersData_body__row-item">${user[2]}</td>
                        <td class="usersData_body__row-item">${user[3]}</td>
                        <td class="usersData_body__row-item">${user[4]}</td>
                        <td class="usersData_body__row-item">${user[5]}</td>
                        <td class="usersData_body__row-item">${user[6]}</td>
                        <td class="usersData_body__row-item">${user[7]}</td>
                        <td class="usersData_body__row-item">${user[8]}</td>
                        <td class="usersData_body__row-item">${user[9]}</td>
                        <td class="usersData_body__row-item">${user[10]}</td>
                        `;
                    document.querySelector('.usersData_body').appendChild(tr);
                });
            }
        },
    });
});

$('#btnSaveFilter').on('click', () => {
    if ($('#filterName').val() !== '' || $('#filterName').val() !== null) {
        if (localStorage.getItem("filters") === null) {
            localStorage.setItem("filters", JSON.stringify([]));
        }

        let filters = JSON.parse(localStorage.getItem("filters"));
        const temp = {'name' : $('#filterName').val(), 'query' : createQuery()};
        filters.push(temp);
        localStorage.setItem("filters", JSON.stringify(filters)); 
        $('#filterName').val('');
        location.reload();
        // fillFilters();
    } else {
        swal.fire({
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
        })
    }
})

$('.settingsFilter_container__list-item--execute').on('click', (e) => {
    const id = e.target.id;
    let filters = JSON.parse(localStorage.getItem("filters"));
    filters.forEach((filter) => {
        if (filter.name == id) {
            $.ajax({
                type: 'POST',
                url: '../../core/searchUser.php',
                data: {
                    param: filter.query,
                },
                success: (result) => {
                    document.querySelector('.usersData_body').innerHTML = '';
                    if (result == 'Not found in the database') {
                        document.querySelector('.usersData_body').innerHTML = '<tr class="usersData_body__row"><td class="usersData_body__row-item"> Not found in Database</td></tr>';
                    } else {
                        let data = result.split('\n');
                        let users = [];
                        for (const row of data) {
                            users.push(row.split('|'));
                        }
                        users.pop();
                        users.forEach((user) => {
                            const tr = document.createElement('tr');
                            tr.setAttribute('class', 'usersData_body__row');
                            tr.classList.add(`completed_${user[11]}`);
                            tr.innerHTML = `
                                <td class="usersData_body__row-item">${user[1]}</td>
                                <td class="usersData_body__row-item">${user[2]}</td>
                                <td class="usersData_body__row-item">${user[3]}</td>
                                <td class="usersData_body__row-item">${user[4]}</td>
                                
                                <td class="usersData_body__row-item">${user[5]}</td>
                                
                                <td class="usersData_body__row-item">${user[6]}</td>
                                
                                <td class="usersData_body__row-item">${user[7]}</td>
                                
                                <td class="usersData_body__row-item">${user[8]}</td>
                                
                                <td class="usersData_body__row-item">${user[9]}</td>
                                
                                <td class="usersData_body__row-item">${user[10]}</td>
                                
                                `;
                            document.querySelector('.usersData_body').appendChild(tr);
                        });
                    }
                } 
            });
        }
    });
})

$('.settingsFilter_container__list-item--delete').on('click', (e) => {
    const id = e.target.id;
    let filters = JSON.parse(localStorage.getItem("filters"));
    const newFilters = [];
    filters.forEach((filter) => {
        if (filter.name !== id) {
            newFilters.push({name: filter.name, query: filter.query});
        }
    });
    localStorage.setItem("filters", JSON.stringify(newFilters));
    // location.reload();
    fillFilters();
})
