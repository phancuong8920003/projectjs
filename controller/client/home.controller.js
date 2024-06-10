// const Product = require("../../models/product.model");



// [GET] /
module.exports.index=async(req , res)=>{
    
    // const products = await Product.find({
    //     deleted:false
    // })
    res.render("client/pages/home/index",{
        titlePage : " Trang Chủ",
    });
   
}