const express = require('express');
const {
    dashboardView,
} = require('../controllers/dashboardController');
const {
    adminView,
    productView,
    uploadFiles,
    addProduct,
    completeOrder
} = require('../controllers/adminController');
const {
    userView,
    orderView,
    createOrder
} = require('../controllers/userController');
const { protectRoute, allowIfAdmin } = require("../auth/protect");
const router = express.Router();

router.get('/', protectRoute, dashboardView);
router.get('/admin/:pageNum', protectRoute, allowIfAdmin, adminView);
router.get('/admin/products/:pageNum', protectRoute, allowIfAdmin, productView);
router.get('/user/products/:category/:pageNum', protectRoute, userView);
router.get('/user/order/:id', protectRoute, orderView);

router.post('/admin/addProduct', protectRoute, allowIfAdmin, addProduct);
router.post('/admin/upload_files', protectRoute, allowIfAdmin, uploadFiles);
router.post('/admin/completeOrder', protectRoute, allowIfAdmin, completeOrder);
router.post('/user/createOrder', protectRoute, createOrder);

module.exports = router;