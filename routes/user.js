const express = require('express');
const { userView } = require('../controllers/userController');
const router = express.Router();
router.get('/', userView);
module.exports = router;