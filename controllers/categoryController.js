const Category = require('../models/categoryModel')

exports.addCategory = async (request, response) => {
    let category = await Category.findOne({ category_name: request.body.category_name })
    if (!category) {
        let category = new Category({
            category_name: request.body.category_name
        })
        category = await category.save()
        if (!category) {
            return response.status(400).json({ error: "something went wrong" })
        }
        response.send(category)
    }
    else{
        return response.status(400).json({error:"Category already exists."})
    }
}

exports.viewCategories = async (req,res) => {
    let category = await Category.find()
    if(!category){
        return response.status(400).json({ error: "something went wrong" })
    }
    res.send(category)
}

exports.updateCategory = async (req,res) => {
    let category = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.category_name
    },
    {new:true})
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}

exports.deleteCategory = (req,res) => {
    Category.findByIdAndRemove(req.params.id)
    .then((category)=>{
        if(category==null){
            return res.status(400).json({error: "Category does not exist."})
        }
        return res.status(200).json({message: "Category deleted successfully."})
    })
    .catch(()=>{
        return res.status(400).json({error: "something went wrong"})
    })
}

exports.findCategory = async (req,res) => {
    let category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}





//  form -> req.body
//  url -> url/value -> req.params
//  url -> ?var='value' -> req.query