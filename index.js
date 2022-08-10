const express = require('express')
require ('dotenv').config()
const db = require('./database/connection')

const app = express()

const port = process.env.PORT || 8000

const bodyparser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const DemoRoute = require('./routes/demoroute')
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute')
const UserRoute = require('./routes/userRoute')
const OrderRoute = require('./routes/orderRoute')
const PaymentRoute = require('./routes/paymentRoute')


app.use(bodyparser.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())


app.use('/api',DemoRoute)
app.use('/api', CategoryRoute)
app.use('/api',ProductRoute)
app.use('/api', UserRoute)
app.use('/api',OrderRoute)
app.use('/api', PaymentRoute)

app.use('/public/uploads',express.static('public/uploads'))
// app.use(DemoRoute)


app.get('/',(request, response)=>{
    response.send("Good Evening!!. Welcome to express js.")
})

app.get('/welcome',(req,res)=>{
    res.send("This is express js.")
})


app.listen(port,()=>{
    console.log(`app started at port ${port}`)
})