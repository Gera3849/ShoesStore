const userView = (req, res) => {
    res.render('user', {});
}

const orderView = (req, res) => {
    res.render('order', {})
}

module.exports = {
    userView,
    orderView
}