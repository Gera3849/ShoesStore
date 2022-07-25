let menuItems = document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";
function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
    }
    else {
        MenuItems.style.maxHeight = "0px";
    }
}

let tbRow = document.getElementsByClassName('tb_row');
let detail = document.getElementsByClassName("detail_icon");
let row_detail = document.getElementsByClassName("row_detail");

for (let i = 0; i < detail.length; i++) {
    tbRow[i].addEventListener('click', function () {
        if (row_detail[i].style.display === 'table-row') {
            row_detail[i].style.display = 'none';
            detail[i].innerHTML = '&#xf107;';
        } else {
            row_detail[i].style.display = 'table-row';
            detail[i].innerHTML = '&#xf106;';
        }
    })
}

function completeOrder(id) {
    const completeDate = formatDate(new Date());
    const completeData = {
        orderId: id,
        orderDate: completeDate
    }
    axios.post('/dashboard/admin/completeOrder', completeData)
        .then(window.location.href = '/dashboard/admin/1')
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getUTCMonth() + 1),
            padTo2Digits(date.getUTCDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getUTCHours()),
            padTo2Digits(date.getUTCMinutes()),
            padTo2Digits(date.getUTCSeconds()),
        ].join(':')
    );
}
