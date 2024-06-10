const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const port = 3000;

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended: false}));
const database = require("./config/database.js");
database.connect();

app.set("views","./views");
app.set("view engine","pug");

app.use(express.static("public"));
//nhung' file tinh~

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

routeAdmin(app);
route(app);

app.listen(port , ()=>{
    console.log(`app listening on port ${port}`);
});