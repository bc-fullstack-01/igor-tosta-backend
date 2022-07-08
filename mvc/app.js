const path = require("path");
const express = require("express");
const methodOverride = require('method-override');
const createError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");

const index = require("./routers/index")
const user = require("./routers/userRouters");



const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use(methodOverride("_method"));



app.use("/", index);
app.use("/user", user);

app.use((req,res,next) =>next(createError(404)));

app.use((err, req, res, next) =>{
    
    if((err.status === 404) || ( err.name && err.name === "CastError") ){
        res.status(404).render("404", {url: req.originalUrl});
    }else{
        res.status(500).render("500", {err});
    }
})


module.exports = app;