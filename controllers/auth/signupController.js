const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const signupView = (req, res) => {
    res.render('signup', {
        username: '',
        email: '',
        password: ''
    })
}

const signupUser = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.log("Fill empty fields");
    } else {
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    console.log('email exists');
                    res.render('signup', {
                        username: username,
                        email: email,
                        password: password
                    });
                } else {
                    const newUser = new User({
                        username: username,
                        email: email,
                        password: password,
                        role: 'user'
                    });
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(res.redirect('/'))
                                .catch((err) => console.log(err));
                        })
                    )
                }
            })
    }
}

module.exports = {
    signupView,
    signupUser
}