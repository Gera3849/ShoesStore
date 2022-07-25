const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('Please log in to continue');
  res.redirect('/');
}
const allowIfAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  res.redirect('/');
}
module.exports = {
  protectRoute,
  allowIfAdmin,
};