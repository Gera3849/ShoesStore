const adminView = (req, res) => {
    res.render('admin', {});
}

const productView = (req, res) => {
    res.render('products', {});
}

module.exports = {
    adminView,
    productView
}