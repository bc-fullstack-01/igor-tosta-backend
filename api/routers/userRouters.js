const createError = require("http-errors");
const express = require("express");
const {User} = require("../model");
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")
const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET || "accestoken"


const router = express.Router()

router
    .route("/")
    .get((req, res, next) => Promise.resolve()
        .then(() => User.find({}))
        .then(data => res.status(200).json(data))
        .catch(err => next(err)))
    .post((req, res, next) => Promise.resolve()
        .then(() =>bcrypt.hash(req.body.password, 10))
        .then(passwordHashed => new User({...req.body, password: passwordHashed}).save())
        .then(() => res.status(201).send({message: "Created a user"}))
        .catch(err => next(err)))
    
router
    .route("/login")
    .post((req, res, next) => Promise.resolve()
        .then(() => User.findOne({user: req.body.user}))
        .then(data =>  data? bcrypt.compare(req.body.password, data.password): next(createError(404)))
        .then(result => result ? 
            jwt.sign(req.body.user, ACCES_TOKEN_SECRET) : next(createError(401)))
        .then(accessToken => res.status(201).json({accessToken}))
        .catch((err) => next(err)))

module.exports = router;