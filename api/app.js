const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const swagger = require("swagger-ui-express");
const jwt = require('jsonwebtoken');

const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET || "accestoken"

const {Connection, User} = require("./model");
const postsRouters = require("./routers/postRouters");
const commentRouters = require("./routers/commentRouters");
const userRouters = require("./routers/userRouters");
const swaggerDocument = require("./swagger");

const app = express();

app.use(cors())
app.use(helmet());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument))
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => Connection
    .then(() => next())
    .catch(err => next(err))
)

const authenticateToken = (req, res, next) =>{
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if (token == null) return next(createError(401))
    jwt.verify(token, ACCES_TOKEN_SECRET, (err, user) =>{
        if (err) return next(createError(403))
        User.findOne({user})
            .then(u =>{
                req.user = u
                next()
            })
            .catch(err => next(err))
    })
}

app.use("/posts", authenticateToken, postsRouters);
app.use("/comments", authenticateToken, commentRouters);
app.use("/user", userRouters);

app.use((req,res,next) =>next(createError(404)));

app.use((err, req, res, next) =>{ 
    if( err.name === "ValidationError"){
        res.status(err.status).send({message: err.message});
    }
    else if((err.status === 404) || ( err.name === "CastError") ){
        res.status(404).send({message:`Não existe rota para ${req.originalUrl}`});
    }else{
        res.status(err.status || 500).send({message:err.message});
    }
})

module.exports = app;