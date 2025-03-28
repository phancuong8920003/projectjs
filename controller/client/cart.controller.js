const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")

const productsHelper = require("../../helper/product") 

// [GET] /cart/
module.exports.index = async(req, res)=>{

    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id : cartId
    });
    if(cart.products.length > 0){
        for(const item of cart.products){
            const productId = item.product_id;
            
            const productInfor = await Product.findOne({
                _id : productId
            });

            productInfor.priceNew = productsHelper.priceNewProduct(productInfor);
            item.productInfor = productInfor
            // tính tổng tiền của 1 sp
            item.totalPrice = item.quantity * productInfor.priceNew;

        }
    }
    
    cart.totalPrice = cart.products.reduce((sum , item) => sum + item.totalPrice,0);

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng ",
        cartDetail: cart
    })
}

// [POST] /cart/add/:productId 
module.exports.addPost=async(req, res)=>{

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    // console.log(cartId);
    // res.send("ok")
    const cart = await Cart.findOne({
        _id : cartId
    });

    const existProductInCart = cart.products.find(item => item.product_id == productId);

    if(existProductInCart){
        const newQuantity  = quantity + existProductInCart.quantity;
        console.log(newQuantity);

        await Cart.updateOne({
            // cap nhat so luong cua san pham trong csdl
            _id : cartId,
            'products.product_id':productId
        },
         {
            'products.$.quantity':newQuantity
         });
        
    
    }else{
        const objectCart = {
            product_id: productId,
            quantity:quantity
        }
    
        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push:{products: objectCart}
                
            }
    
        );

    }


    
    // req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công");
    res.redirect("back");
    
}

// [GET] /cart/delete/:productId
module.exports.delete = async(req, res)=>{
    const cartId = req.cookies.cartId
    const productId = req.params.productId;
    console.log(productId);

    await Cart.updateOne({
        _id : cartId
    }, {
        "$pull" : {products: {"product_id":productId}}
    });
    
    res.redirect("back");

}