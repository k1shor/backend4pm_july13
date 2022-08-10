const Product = require('../models/productModel')

exports.addProduct = async (req, res) => {
    let product = new Product({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
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
    let sortBy = req.query.order ? req.query.sortBy : 'createdAt'
    let order = req.query.order? req.query.order: "ASC"
    let limit = req.query.order ? Number(req.query.limit) : 2000000
    
    // 1, ASC, ascending, 
    // 0, DESC, descending

    let product = await Product.find().populate('category', 'category_name')
    .sort([[sortBy, order]])
    .limit(limit)
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
        product_description: req.body.product_description,
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

// to get filtered Products 
exports.filteredProducts = async(req, res) => {
    let sortBy = req.query.order ? req.query.sortBy : 'createdAt'
    let order = req.query.order? req.query.order: "ASC"
    let limit = req.query.order ? Number(req.query.limit) : 2000000

    // to get filter
    let Args = {}
    for (let key in req.body.filters){
        if(req.body.filters[key].length>0){
            if(key === 'product_price'){
                Args[key] = {
                    $gte : req.body.filters[key][0],
                    $lte : req.body.filters[key][1]
                }
            }
            else{
                Args[key] = req.body.filters[key]
            }
        }
    }
    let filteredProducts = await Product.find(Args).populate('category')
    .sort([[sortBy, order]])
    .limit(limit)

    if(!filteredProducts){
        return res.status(400).json({error: "Something went wrong"})
    }
    else{
        res.json({
            filteredProducts,
            size: filteredProducts.length
        })
    }

}

// to get related products
exports.relatedProducts = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({error:"Something went wrong"})
    }
    else{
        let relatedProducts = await Product.find({
            category: product.category,
            _id: {$ne: product._id} 
        })
        .sort([['createdAt','DESC']])
        .limit(4)
        if(!relatedProducts){
        return res.status(400).json({error:"Something went wrong"})
        }
        else{
            res.send(relatedProducts)
        }
    }
}