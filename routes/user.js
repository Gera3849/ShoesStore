const express = require('express');
const { 
    userView,
    orderView
} = require('../controllers/userController');
const router = express.Router();

router.get('/', userView);
router.get('/order', orderView);

module.exports = router;