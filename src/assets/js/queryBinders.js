import $ from 'jquery';

export const createQuery = () => {
    const queryBase = "WHERE 0 = 0";
    let query = queryBase;
    const secret = '$secret';

    const addFilter = (field, value) => {
        if (value !== '') {
            query += ` AND ${field} LIKE "%${value}%"`;
        }
    };

    addFilter('uuid', $('#search_uuid').val());
    addFilter('name', $('#search_name').val());
    addFilter('firstname', $('#search_firstname').val());
    addFilter('email', $('#search_email').val());

    addFilter(`AES_DECRYPT(street, "${secret}")`, $('#search_street').val());
    addFilter(`AES_DECRYPT(house_number, "${secret}")`, $('#search_house').val());
    addFilter(`AES_DECRYPT(box, "${secret}")`, $('#search_box').val());
    addFilter(`AES_DECRYPT(zipcode, "${secret}")`, $('#search_zip').val());
    addFilter(`AES_DECRYPT(city, "${secret}")`, $('#search_city').val());
    addFilter(`AES_DECRYPT(phone, "${secret}")`, $('#search_phone').val());

    let sortColumn = '';
    let sortOrder = '';

    document.querySelectorAll('.usersData_head__row-item div').forEach((item) => {
        if (item.querySelector('.sort_icon').classList.contains('visible')) {
            sortColumn = item.id.split('-').pop();
            sortOrder = item.querySelector('.sort_icon').classList.contains('rotate') ? 'DESC' : 'ASC';
        }
    });

    if (sortColumn === '') {
        sortColumn = 'id';
        sortOrder = 'ASC';
    }

    query += ` ORDER BY ${sortColumn} ${sortOrder}`;

    return query;
};

export const createAdvanceQuery = () => {
    const queryBase = "WHERE 0 = 0";
    const secret = '$secret';
    const params = document.querySelectorAll('.advanceFilter_container__settings-columns--query .row');
    
    let query = queryBase;

    params.forEach((e) => {
        const operatorInput = e.querySelector('.andOrSwitch').querySelector('.toggle-checkbox').checked;
        const columnInput = e.querySelector('.filterColumn').value;
        const includeInput = e.querySelector('.includeSwitch').querySelector('.toggle-checkbox').checked;
        const valueInput = e.querySelector('.filterValue').value;
        
        if (columnInput !== '99' && valueInput !== '') {
            let operator = "";
            let include = "";
            let column = "";

            if (operatorInput) {
                operator = 'OR';
            } else {
                operator = 'AND';
            }

            if (includeInput) {
                include = 'NOT LIKE';
            } else {
                include = 'LIKE';
            }

            if (columnInput === 'id' || columnInput === 'uuid' || columnInput === 'name' || columnInput === 'firstname' || columnInput === 'lastname' || columnInput === 'email' || columnInput === 'completed') {
                column = columnInput;
            } else {
                column = `AES_DECRYPT(${columnInput}, "${secret}")`;
            }

            query += ` ${operator} ${column} ${include} "%${valueInput}%"`;
        }
    });

    return query;
};