
const Product = require("../../models/product.model");
const User = require("../../models/user.model")

// [GET] /admin/dashboard
module.exports.dashboard=async(req , res)=>{

   const statistic = {
      product:{
         total:0,
         active:0,
         inactive:0
      },
      user:{
         total:0,
         active:0,
         inactive:0
      }
   }
   statistic.product.total = await Product.countDocuments({
      deleted: false
   });
   statistic.product.active = await Product.countDocuments({
      status:"active",
      deleted: false
   })
   statistic.product.inactive = await Product.countDocuments({
      status:"inactive",
      deleted: false
   })
   //liet ke tk nguoi dung
   statistic.user.total = await User.countDocuments({
      deleted: false
   });
   statistic.user.active = await User.countDocuments({
      status:"active",
      deleted: false
   })
   statistic.user.inactive = await User.countDocuments({
      status:"inactive",
      deleted: false
   })
   res.render("admin/pages/dashboard/index",{
      pageTile:"Trang tổng quan",
      statistic: statistic
   });
}