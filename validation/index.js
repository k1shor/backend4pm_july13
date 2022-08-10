const {check, validationResult} = require('express-validator')

exports.categoryCheck = [
    check('category_name','category name is required').notEmpty()
    .isLength({min:3}).withMessage("category must be at least 3 characters")
]

exports.productCheck = [
    check('product_name','Product name is required').notEmpty()
    .isLength({min:3}).withMessage("Product name must be at least 3 characters"),
    check('product_price','Product price is required').notEmpty()
    .isNumeric().withMessage("Product price must be a number"),
    check('count_in_stock','Count in stock is required').notEmpty()
    .isNumeric().withMessage("Count must be a number"),
    check('product_description','Description is required').notEmpty()
    .isLength({min:20}).withMessage("Description must be at least 20 characters"),
    check('category',"Category is required").notEmpty()
]

exports.userCheck =[
    check('username','User name is required').notEmpty()
    .isLength({min:3}).withMessage("Username must be at least 3 characters"),
    check('email',"Email is required").notEmpty()
    .isEmail().withMessage("Email format incorrect"),
    check('password',"password is required").notEmpty()
    .not().isIn(['123', /password/i, 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({min:8}).withMessage("Password must be at least 8 characters")
    .isLength({max:30}).withMessage("Password must not be more than 30 characters")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase alphabet")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase alphabet")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[-_!@#$%^&*]/).withMessage("Password must contain at least one Special character")
    .not().matches(/[;:\\.]/).withMessage("This character is not allowed")

]



exports.validation = (req, res, next) => {
const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()[0].msg})
    // return res.status(400).json({errors:errors.array().map(err=>{return err.msg})})
}
next()
}