const Order = require('../models/Order');
const Product = require('../models/Product');

const adminView = async (req, res) => {
    const orders = await Order.find();
    const products = await Product.find();
    const pageNum = req.params.pageNum;

    res.render('admin', {
        orders: orders,
        products: products,
        pageNum: pageNum
    })
}

const productView = async (req, res) => {
    const pageNum = req.params.pageNum;
    const products = await Product.find();

    res.render('products', {
        products: products,
        pageNum: pageNum
    });
}

const addProduct = async (req, res) => {
    const { title, cost, category, detail } = req.body;

    if (!title || !cost || !category || !detail) {
        console.log('Fill empty fields');
    } else {
        const newProduct = new Product({
            title: title,
            cost: cost,
            category: category,
            detail: detail,
            image: []
        })

        await newProduct
            .save()

        const product = await Product.find({ title: title, cost: cost, category: category, detail: detail });

        res.send(product)
    }
}

const uploadFiles = async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let img_data = [];
            const id = req.body.id;

            for (let i = 0; i < 4; i++) {
                let image = req.files.files[i];
                let img_name = Date.now() + i + image.name;

                image.mv('./public/asset/images/' + img_name);

                img_data.push(img_name);
            }

            await Product.updateOne({ '_id': id }, { $set: { 'image': img_data } });

            const newProduct = await Product.findOne({ '_id': id });

            res.send(newProduct);
        }
    } catch (err) {
        res.status(500).send(err);
    }

}

const completeOrder = async (req, res) => {
    await Order.updateOne({ '_id': req.body.orderId }, {
        $set: {
            'orderstatus': 'complete',
            'completeddate': req.body.orderDate
        }
    })
}

module.exports = {
    adminView,
    productView,
    addProduct,
    uploadFiles,
    completeOrder
}