const express = require('express');
const { 
    adminView,
    productView
} = require('../controllers/adminController');
const router = express.Router();

router.get('/', adminView);
router.get('/products', productView);

module.exports = router;