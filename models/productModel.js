const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    }, 
    product_price: {
        type: Number,
        required : true
    },
    product_description:{
        type: String,
        required: true
    },
    product_image:{
        type: String,
        required: true
    },
    count_in_stock:{
        type: Number,
        required: true
    },
    category:{
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    rating: {
        type: Number,
        default: 1
    }
},{timestamps: true})

module.exports = mongoose.model('Product', productSchema)