const express = require("express");
const {User, Profile} = require("../model");

const bcrypt =  require("bcrypt")

const router = express.Router()

router
    .route("/me")
    .get((req, res, next) => Promise.resolve()
        .then(() => User.findById( req.profile.user))
        .then(data => res.status(200).json(data))
        .catch(err => next(err)))
    .put((req, res, next) => Promise.resolve()
        .then(() =>{ if(req.body.password != null){
            return bcrypt.hash(req.body.password, 10)
        }})
        .then((data) =>data? 
            User.findByIdAndUpdate(req.profile.user, {...req.body, password: data}, {runValidators: true}):
            User.findByIdAndUpdate(req.profile.user, req.body, {runValidators: true}))
        .then(() =>{if(req.body.name != null){
            return req.body.name
        }})
        .then(data => data? Profile.findByIdAndUpdate(req.profile, {name: data},{runValidators: true}): {})
        .then(()=>res.status(200).send({message: "Successfully Update User"}))
        .catch(err => next(err))
    )
    .delete((req, res, next) => Promise.resolve()
        .then(() => Profile.findByIdAndDelete(req.profile))
        .then(() => User.findByIdAndDelete(req.profile.user))
        .then(() => res.status(200).send({message: "Successfully Deleted User"}))
        .catch(err => next(err))
    )

module.exports = router;