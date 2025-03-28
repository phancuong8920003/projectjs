const User = require("../../models/user.model")
const Cart = require("../../models/cart.model")

const md5  = require("md5")
// [GET] /user/register
module.exports.register=async(req , res)=>{
res.render("client/pages/user/register",{
    titlePage : " Đăng ký tài khoản",
});
}

// [POST] /user/register
module.exports.registerPost=async(req , res)=>{
    const exisEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(exisEmail){
        // res.alert("email đã tồn tại ");
        res.redirect("back");
        return;
    }
    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();

    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/product")
   
    }

// [GET] /user/login
module.exports.login=async(req , res)=>{
    res.render("client/pages/user/login",{
        titlePage : " Đăng nhập tài khoản",
    });
    }

    // [POST] /user/login
module.exports.loginPost=async(req , res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted:false
    });

    if(!user){
        // req.flash("error", "Email không tồn tại!")
        res.redirect("back");
        return;
    }

    if(md5(password) != user.password){
        // req.flash("error","Sai mật khẩu!")
        res.redirect("back");
        return;
    }

    if(user.status == "inactive"){
        // req.flash("error","Tài khoản đang bị khóa")
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser",user.tokenUser)

    // Lưu user_id vào collection carts
    console.log(user.id);
    console.log(req.cookies.cartId);

    await Cart.updateOne({
        _id : req.cookies.cartId
    },{
        user_id : user.id
    })
    
    

    res.redirect("/product")
    
    }

    // [GET] /user/logout
module.exports.logout=async(req , res)=>{
    res.clearCookie("tokenUser")
    res.redirect("/product")
    }

     // [GET] /user/infor
module.exports.infor=async(req , res)=>{
    res.render("client/pages/user/infor",{
        titlePage: "Thông tin tài khoản"
    })
    
    }
