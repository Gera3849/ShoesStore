function createOrder(id) {
    const productSize = document.getElementById('product_size').value;
    const userAddress = document.getElementById('user_address').value;
    const paymentType = document.getElementById('payment_type').value;
    const productQuantity = document.getElementById('product_quantity').value;
    const createDate = formatDate(new Date());

    if (!productSize || !userAddress || !paymentType || !productQuantity) {
        alert('Fill all the fields');
        return;
    } else {
        const orderData = {
            productId: id,
            productSize: productSize,
            userAddress: userAddress,
            paymentType: paymentType,
            productQuantity: productQuantity,
            createDate: createDate
        }

        axios.post('/dashboard/user/createOrder', orderData)
            .then(window.location.href = '/dashboard/user/products/allProducts/1')
    }
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
