const Product = require("../../models/product.model");
const productHelper = require("../../helper/product")



// [GET] /
module.exports.index=async(req , res)=>{
    
    const product = await Product.find({
        deleted:false
    }).limit(3)
    const newPrice = productHelper.priceNewProducts(product);
    product.priceNew = newPrice

    //sp mới cập nhật lấy 6
    const product1 = await Product.find({
        deleted:false
    }).limit(6)
    const newPrice1 = productHelper.priceNewProducts(product1);
    product1.priceNew = newPrice1
  

    res.render("client/pages/home/index",{
        titlePage : " Trang Chủ",
        products: product,
        product : product1
    });
   
}