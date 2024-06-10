const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./product-category.route");



module.exports = (app)=>{
    app.use("/admin/dashboard",dashboardRouter);
    
    app.use("/admin/product",productRouter);
    
    app.use("/admin/product-category",productCategoryRouter);

 
};