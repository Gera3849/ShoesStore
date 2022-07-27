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

const editView = async (req, res) => {
    const id = req.params.id;
    const editData = await Product.findOne({_id: id});

    res.render('edit', {
        editData: editData
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
    const { title, cost, category, detail, image } = req.body;

    if (!title || !cost || !category || !detail || !image) {
        console.log('Fill empty fields');
    } else {
        const newProduct = new Product({
            title: title,
            cost: cost,
            category: category,
            detail: detail,
            image: image
        })

        await newProduct
            .save()

        res.send('Success')
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
            // const id = req.body.id;
            const len = req.files.files.length || 1;

            if (len == 1) {
                let image = req.files.files;
                let img_name = Date.now() + image.name;
                image.mv('./public/asset/images/' + img_name);
                img_data.push(img_name);
            } else {
                for (let i = 0; i < len; i++) {
                    let image = req.files.files[i];
                    let img_name = Date.now() + i + image.name;
    
                    image.mv('./public/asset/images/' + img_name);
    
                    img_data.push(img_name);
                }
            }

            res.send(img_data)

            // await Product.updateOne({ '_id': id }, { $set: { 'image': img_data } });

            // const newProduct = await Product.findOne({ '_id': id });

            // res.send(newProduct);
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

const updateProduct = async (req, res) => {
    const {id, title, cost, category, detail, image} = req.body;

    await Product.updateOne({_id: id}, {
        $set: {
            'title': title,
            'cost': cost,
            'category': category,
            'detail': detail,
            'image': image
        }
    })

    res.send('Success');
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    await Product.deleteOne({_id: id});

    res.send('Success');
}

module.exports = {
    adminView,
    editView,
    productView,
    addProduct,
    uploadFiles,
    completeOrder,
    updateProduct,
    deleteProduct
}