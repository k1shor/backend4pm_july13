const express = require('express')
const { addCategory, viewCategories, updateCategory, deleteCategory, findCategory } = require('../controllers/categoryController')
const { requireSignin } = require('../controllers/userController')
const { categoryCheck, validation } = require('../validation')
const router = express.Router()

router.post('/addcategory', categoryCheck, validation, requireSignin,addCategory)
router.get('/viewCategories',viewCategories)
router.put('/updatecategory/:id', requireSignin,updateCategory)
router.delete('/deletecategory/:id', requireSignin, deleteCategory)
router.get('/findcategory/:id',findCategory)


module.exports = router