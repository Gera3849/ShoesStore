

let orderButton = document.getElementById('order_btn');

orderButton.addEventListener("click", createOrder);

function createOrder() {
    let productName = document.getElementById('product_name').innerHTML;
    let productType = document.getElementById('product_type').innerHTML;
    let productPrice = document.getElementById('product_price').innerHTML;
    let productSize = document.getElementById('product_size').value;
    let userAddress = document.getElementById('user_address').value;
    let paymentType = document.getElementById('payment_type').value;
    let product_quantity = document.getElementById('product_quantity').value;
    let product_detail = document.getElementById('product_detail').innerHTML;

    const orderData = {
        productName: productName,
        productType: productType,
        productPrice: productPrice,
        productSize: productSize,
        userAddress: userAddress,
        paymentType: paymentType,
        product_quantity: product_quantity,
        product_detail: product_detail
    }

    axios.post('/user/createOrder', orderData)
        .then((res) => {
            console.log('order', res.data);
        })
}
