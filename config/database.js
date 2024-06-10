const mongoose = require("mongoose");

module.exports.connect = async()=>{
    try {

 await mongoose.connect("mongodb://localhost:27017/product-manager");
 console.log("Connect database thành công")
        
    } catch (error) {
        console.log("Connect database thất bại")
        
    }
}
