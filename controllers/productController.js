const Product = require('../models/productModel')

exports.addProduct = async (req, res) => {
    let product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.description,
        product_image: req.file.path,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category
    })
    product = await product.save()
    if (!product) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(product)
}

exports.viewProducts = async (req, res) => {
    let product = await Product.find().populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(product)
}

exports.productDetails = async (req, res) => {
    let product = await Product.findById(req.params.id).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(product)
}

exports.productByCategory = async (req, res) => {
    let product = await Product.find({ category: req.params.category_id })
    if (!product) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(product)
}

exports.updateProduct = async (req, res) => {
    let product = await Product.findByIdAndUpdate(req.params.id, {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.description,
        product_image: req.file.path,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category,
        rating: req.body.rating
    },
        { new: true })
    if (!product) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(product)
}

exports.deleteProduct = async (req, res) => {
    let product = await Product.findByIdAndRemove(req.params.id)
    if (!product) {
        return res.status(400).json({ error: "product not found" })
    }
    else {
        return res.status(200).json({ message: "Product deleted successfully" })
    }

}
// Product.findByIdAndRemove(req.params.id)
// .then(product=>{
//     if(product==null){
//         return res.status(400).json({error:"product not found"})
//     }
//     else{
//         return res.status(200).json({message:"Product deleted successfully"})
//     }
// })
// .catch(()=>{
//     return res.status(400).json({error:"something went wrong"})
// })