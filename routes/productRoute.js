const express = require('express')
const { addProduct, viewProducts, productDetails, productByCategory, updateProduct, deleteProduct, filteredProducts, relatedProducts } = require('../controllers/productController')
const { requireSignin } = require('../controllers/userController')
const upload = require('../utils/fileUpload')
const { productCheck, validation } = require('../validation')
const router = express.Router()

router.post('/addproduct',upload.single('product_image'), productCheck, validation, requireSignin,addProduct)
router.get('/viewproducts', viewProducts)
router.get('/productdetails/:id', productDetails)
router.get('/productbycategory/:category_id', productByCategory)
router.put('/updateproduct/:id',requireSignin, updateProduct)
router.delete('/deleteproduct/:id',requireSignin, deleteProduct)
router.post('/filteredProduct',filteredProducts )
router.get('/relatedProducts/:id', relatedProducts)


module.exports = router