const express = require('express');
const { 
    authView,
    loginUser,
    registerUser
} = require('../controllers/authController');
const router = express.Router();

router.get('/', authView);


router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;