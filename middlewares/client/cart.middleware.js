const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) =>{
    // console.log("Luon chay vao day ");
    console.log(req.cookies.cartId);

    if(!req.cookies.cartId){
        const cart = new Cart();
        await cart.save();
        // cho thoi gian cookie tồn tại 1 năm
        const expiresTime = 1000 * 60 * 60 * 24 * 365;

        console.log(cart);
        res.cookie("cartId", cart.id, {
            expires : new Date(Date.now() + expiresTime)
        });
        


        
    }else{
        //khi da co gio hang
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });

        cart.totalQuantity = cart.products.reduce((sum, item) =>
            sum + item.quantity, 0)
            res.locals.minicart = cart;
    // }
}
next();
}