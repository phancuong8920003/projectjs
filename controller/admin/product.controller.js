const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
//lay danh sách danh muc
const createTreeHelper = require("../../helper/create-tree");
// [GET] /admin/product

module.exports.index = async(req, res) => {
    let filterStatus = [
        {
            name : "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động", 
            status: "inactive",
            class:""
        }
    ];

    if(req.query.status){
        const index = filterStatus.findIndex(item =>item.status == req.query.status);
        filterStatus[index].class="active";
    }else{
        const index = filterStatus.findIndex(item =>item.status == ""); 
        filterStatus[index].class="active";
    }


    console.log(req.query.status);

    let find = {
        deleted : false
    }
    if(req.query.status){
    find.status = req.query.status;
    }

    const products = await Product.find(find)
    console.log(products)
    res.render("admin/pages/product/index",{
        pageTile:"Danh sách sản phẩm",
        product:products,
        filterStatus:filterStatus
     })
  }

  // [PATCH] /admin/product/change-status/:status/:id
  module.exports.changeStatus = async (req , res)=>{
        console.log(req.params);

        const status = req.params.status;
        const id = req.params.id;
        
        await Product.updateOne({_id:id},{status:status});

        res.redirect("/admin/product");
  }


  // [DELETE] /admin/product/delete/:id
  module.exports.deleteItem = async (req , res)=>{

    
    const id = req.params.id;
    
    await Product.deleteOne({_id:id});

    res.redirect("back");
};

//// [GET] /admin/product/create
module.exports.create = async (req , res) =>{
    let find = {
        deleted : false
    };
    

    const category = await ProductCategory.find(find);

    const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/product/create",{
        pageTitle:"Thêm mới sản phẩm",
        category: newCategory
    });
};

//// [POST] /admin/product/create
module.exports.createPost = async (req , res) =>{
    console.log(req.file);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){

        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;

    }else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.file){

        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }



    const product = new Product(req.body);
    await product.save();

    res.redirect("/admin/product");
};

//// [GET] /admin/product/edit/:id
module.exports.edit = async (req , res) =>{
    console.log(req.params.id);
    const find={
        deleted: false,
        _id: req.params.id
    };
    const product = await Product.findOne(find);


    const category = await ProductCategory.find({
        deleted : false
    });

    const newCategory = createTreeHelper.tree(category);
    console.log(product);

    res.render("admin/pages/product/edit",{
        pageTitle:"Thêm mới sản phẩm",
        product: product,
        category: newCategory
    });
};

//// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req , res) =>{
        const id = req.params.id;
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.position = parseInt(req.body.position);
        if(req.file){
    
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
    
        try {
            await Product.updateOne({_id: id},req.body);
           
            
        } catch (error) {
            
            
        }

        res.redirect("/admin/product");
    };
