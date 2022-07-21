const authView = (req, res) => {
    res.render('auth', {});
}

const loginUser = (req, res) => {
    const { username, password } = req.body;

    console.log('loginUser', username, password);

    res.redirect('/admin')
}

const registerUser = (req, res) => {
    const {reg_name, reg_email, reg_password} = req.body;

    console.log('registerUser', reg_name, reg_email, reg_password);
    // console.log('ddd', req.body)
}

module.exports = {
    authView,
    loginUser,
    registerUser
}