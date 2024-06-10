const Product = require("../../models/product.model");
const productHelper = require("../../helper/product");
module.exports.index = async(req,res) =>{

        const keyword = req.query.keyword;

        let newProducts = [];

        if(keyword){
            const keywordRegex = new RegExp(keyword,"i")

            const product = await Product.find(
                {
                    title:keywordRegex,
                    status:"active",
                    deleted:false
                }
            );

                newProduct = productHelper.priceNewProducts(product)
        }

    res.render("client/pages/search/index",{
        pageTitle:"Kết quả tìm kiếm",
        keyword:keyword,
        product: newProduct
    });
};