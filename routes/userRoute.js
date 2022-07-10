const express = require('express')
const { addUser, confirmUser, resendConfirmation, forgetPassword, resetPassword, signin, userList, userDetails, findUserByEmail, updateUser, deleteUser } = require('../controllers/userController')
const { userCheck, validation } = require('../validation')
const router = express.Router()

router.post('/register', userCheck, validation, addUser)
router.get('/confirmuser/:token', confirmUser)
router.post('/resendverification',resendConfirmation)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/signin', signin)
router.get('/userlist', userList)
router.get('/userdetails/:id', userDetails)
router.post('/finduserbyemail', findUserByEmail)
router.put('/updateuser/:id', updateUser)
router.delete('/deleteuser/:id',deleteUser)

module.exports = router