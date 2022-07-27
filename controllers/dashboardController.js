const dashboardView = (req, res) => {
    if (req.user.role == 'user') {
        res.redirect('/dashboard/user/products/allProducts/1');
    } else {
        res.render('dashboard', {
            user: req.user
        });
    }
}

module.exports = {
    dashboardView
}