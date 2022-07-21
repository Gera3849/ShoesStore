const express = require('express');
// const multer  = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage: storage })
const { 
    adminView,
    productView,
    uploadFiles,
    addProduct
} = require('../controllers/adminController');
const router = express.Router();

router.get('/', adminView);
router.get('/products', productView);

router.post('/addProduct', addProduct);
router.post('/upload_files', uploadFiles);

module.exports = router;