const path = require("path");
const express = require("express");
const methodOverride = require('method-override');
const createError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");

const index = require("./routers/index")
const user = require("./routers/userRouters");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use(methodOverride("_method"));


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "secret"
}));

app.use((req,res,next) =>{
    res.locals = Object.assign(res.locals, req.session.form)
    res.locals.errors = Object.assign([], res.locals, req.session.errors)
    res.locals.messages = Object.assign([], res.locals, req.session.messages)
    
    next()

    req.session.errors = []
    req.session.messages = []
    req.session.form = {}
});

app.use("/", index);
app.use("/user", user);

app.use((req,res,next) =>next(createError(404)));

app.use((err, req, res, next) =>{

    if( err.name=== "ValidationError"){
        const lastView = req.headers.referer.replace(`${req.headers.origin}/`, "/");
        
        req.session.form = req.body;
        req.session.errors = Object.entries(err.errors).map(([,obj])=> obj);
        req.session.messages.push(err.message);

        res.redirect(lastView);
    }
    
    else if((err.status === 404) || ( err.name && err.name === "CastError") ) {
        res.status(404).render("404", {url: req.originalUrl});
    } 
    else {
        res.status(500).render("500", {err});
    }
})


module.exports = app;