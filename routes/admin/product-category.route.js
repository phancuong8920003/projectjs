const express = require("express");
const multer = require("multer");
const storageMulter = require("../../helper/storageMulter")


const upload = multer({ storage:storageMulter()});

const route = express.Router();

const controller = require("../../controller/admin/product-category.controller");



route.get("/",controller.index);

route.get("/create",controller.create);

route.post("/create", upload.single("thumbnail"),controller.createPost);

route.get("/edit/:id",controller.edit);

route.patch("/edit/:id", upload.single("thumbnail"),controller.editPatch);





module.exports=route;
