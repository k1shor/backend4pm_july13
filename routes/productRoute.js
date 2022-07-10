const express = require('express')
const { addProduct, viewProducts, productDetails, productByCategory, updateProduct, deleteProduct } = require('../controllers/productController')
const { requireSignin } = require('../controllers/userController')
const upload = require('../utils/fileUpload')
const { productCheck, validation } = require('../validation')
const router = express.Router()

router.post('/addproduct',productCheck, validation ,upload.single('product_image'), requireSignin,addProduct)
router.get('/viewproducts', viewProducts)
router.get('/productdetails/:id', productDetails)
router.get('/productbycategory/:category_id', productByCategory)
router.put('/updateproduct/:id',upload.single('product_image'),requireSignin, updateProduct)
router.delete('/deleteproduct/:id',requireSignin, deleteProduct)

module.exports = router