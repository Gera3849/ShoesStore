const Product = require('../models/Product');
const Order = require('../models/Order');

const userView = async (req, res) => {
    const pageNum = req.params.pageNum;
    const category = req.params.category;

    if (category == 'allProducts') {
        const products = await Product.find();

        res.render('user', {
            products: products,
            pageNum: pageNum,
            category: category
        });
    } else {
        const products = await Product.find({ 'category': category });

        res.render('user', {
            products: products,
            pageNum: pageNum,
            category: category
        });
    }
}

const orderView = async (req, res) => {
    const id = req.params.id;
    const orderData = await Product.findOne({ _id: id });

    res.render('order', {
        orderData: orderData
    })
}

const createOrder = async (req, res) => {
    const { productId, productSize, userAddress, paymentType, productQuantity, createDate } = req.body;
    const username = req.user.username;
    const newOrder = new Order({
        username: username,
        productid: productId,
        productsize: productSize,
        productquantity: productQuantity,
        useraddress: userAddress,
        paymenttype: paymentType,
        createddate: createDate,
        completeddate: '',
        orderstatus: 'incomplete'
    })

    await newOrder
        .save()

}

module.exports = {
    userView,
    orderView,
    createOrder
}