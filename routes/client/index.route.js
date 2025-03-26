const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware= require("../../middlewares/client/cart.middleware");
const userMiddleware= require("../../middlewares/client/user.middleware");


const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const searchRouter = require("./search.route")
const cartRouter = require("./cart.route");
const checkoutRouter = require("./checkout.route");
const userRouter = require("./user.route");




module.exports = (app)=>{
    app.use("/",categoryMiddleware.category,homeRouter);

    app.use(cartMiddleware.cartId); 

    app.use(userMiddleware.inforUser); 


    app.use("/product",categoryMiddleware.category,productRouter);

    app.use("/search",searchRouter)

    app.use("/cart",cartRouter)
    
    app.use("/checkout",checkoutRouter)

    app.use("/user",userRouter)

   
    
};