const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model")
const productsHelper = require("../../helper/product")

// [GET] /product
module.exports.index=async(req , res)=>{
    const products = await Product.find({
        status: "active",
        deleted: false
    });
    const priceNew = productsHelper.priceNewProducts(products);
    products.priceNew = priceNew;
    
    // console.log(products);

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
    const product = await Product.findOne(find);
    console.log(product);
  product.priceNew = productsHelper.priceNewProduct(product)

    res.render("client/pages/product/detail",{
        titlePage :product.title,
        product:product
    });
    
   } catch (error) {
    res.redirect("/product");
    
   }
};

// [GET] /product/:slugCategory
// module.exports.category=async(req,res)=>{
    // console.log(req.params.slugCategory);

    // const category = await ProductCategory.findOne({
    //     slug: req.params.slugCategory,
    //     deleted: false
    // })
    // console.log(category.id);

    // const products = await Product.find({
    //     product_category_id: category.id,
    //     deleted:false
    // })
    // const priceNew = productsHelper.priceNewProducts(products);
    // products.priceNew = priceNew


    // res.render("client/pages/product/index",{
    //     titlePage :category.title,
    //     product: products
    // });
// }


