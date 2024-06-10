const Product = require("../../models/product.model");

// [GET] /product
module.exports.index=async(req , res)=>{
    const products = await Product.find({
        status: "active",
        deleted: false
    });
    
    console.log(products);

    res.render("client/pages/product/index",{
        titlePage :"Danh sách sản phẩm",
        product: products
    });
}


// [GET] /product/:slug
module.exports.detail=async(req , res)=>{
   try {
    const find = {
        deleted: false,
        slug: req.params.slug,
        status:"active"
    };
    const product = await  Product.findOne(find);
    console.log(product);

    res.render("client/pages/product/detail",{
        titlePage :product.title,
        product:product
    });
    
   } catch (error) {
    res.redirect("/product");
    
   }

 
};
