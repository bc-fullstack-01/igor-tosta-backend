const express = require("express");
const {User, Profile} = require("../model");

const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")

const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET || "accestoken"


const router = express.Router()

router
    .route("/register")
    .post((req, res, next) => Promise.resolve()
        .then(() =>bcrypt.hash(req.body.password, 10))
        .then(passwordHashed => new User({...req.body, password: passwordHashed}).save())
        .then(user => new Profile({name: user.name, user: user.id}).save())
        .then(() => res.status(201).send({message: "Created a user"}))
        .catch(err => next(err)))
    
router
    .route("/login")
    .post((req, res, next) => Promise.resolve()
        .then(() => User.findOne({user: req.body.user}))
        .then(data => Promise.resolve(data)
            .then(() => bcrypt.compare(req.body.password, data.password))
            .catch(err => next(err)))
        .then(() => Promise.resolve()
            .then(() => jwt.sign(req.body.user, ACCES_TOKEN_SECRET))
            .catch(err => next(err)))
        .then(accessToken => res.status(201).json({accessToken}))
        .catch(err => next(err)))

module.exports = router;