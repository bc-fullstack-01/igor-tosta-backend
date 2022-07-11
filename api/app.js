const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors")
const helmet = require("helmet");
const swagger = require("swagger-ui-express")

const {Connection} = require("./model")
const postsRouters = require("./routers/postRouters");
const commentRouters = require("./routers/commentRouters")
const swaggerDocument = require("./swagger")

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

app.use("/posts", postsRouters);
app.use("/posts", commentRouters)

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