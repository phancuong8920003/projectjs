const categoryMiddleware = require("../../middlewares/client/category.middleware");
const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const searchRouter = require("./search.route")


module.exports = (app)=>{
    app.use("/",categoryMiddleware.category,homeRouter);
    app.use("/product",categoryMiddleware.category,productRouter);
    app.use("/search",searchRouter)
   
    
};