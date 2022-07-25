const passport = require("passport");

const loginView = (req, res) => {
  res.render('login', {
    email: '',
    password: ''
  })
}

const loginUser = (req, res) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email: email,
      password: password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/",
      failureFlash: true,
    })(req, res);
  }
}

const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}

module.exports = {
  loginView,
  loginUser,
  logout
}