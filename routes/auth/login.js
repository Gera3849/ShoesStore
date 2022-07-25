const express = require('express');
const {
    loginView,
    logout,
    loginUser
} = require('../../controllers/auth/loginController');
const router = express.Router();

router.get('/', loginView);
router.get('/logout', logout);

router.post('/', loginUser);

module.exports = router;