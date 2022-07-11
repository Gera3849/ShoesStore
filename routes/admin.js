const express = require('express');
const { adminView } = require('../controllers/adminController');
const router = express.Router();
router.get('/', adminView);
module.exports = router;