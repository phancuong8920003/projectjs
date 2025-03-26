const ProductCategory = require("../../models/product-category.model");

const createTreeHelper = require("../../helper/create-tree");

module.exports.category =async (req , res,next) =>{
    const productsCategory = await ProductCategory.find({
        deleted:false
    }
    );

    const newProductCategory = createTreeHelper.tree(productsCategory);
    res.locals.layoutProductCategory=newProductCategory ;
    // console.log("Luôn chạy qua đây");
    next();
}