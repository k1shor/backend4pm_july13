const express = require('express')
const { processPayment, sendStripeAPI } = require('../controllers/paymentController')
const {requireSignin} = require('../controllers/userController')
const router = express.Router()

router.post('/processpayment',requireSignin, processPayment)
router.get('/stripeAPIKey',sendStripeAPI)

module.exports = router