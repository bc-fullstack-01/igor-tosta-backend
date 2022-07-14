const express = require("express");
const {Profile} = require("../model")

const router = express.Router();

router
    .route("/profile")
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.find({}))
        .then(data => res.status(200).json(data))  
        .catch(err => next(err))  
    )

router
    .route("/profile/search")
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.find({name:{$regex: req.query.q}}))
        .then(data => res.status(200).json(data))  
        .catch(err => next(err))  
    )

router
    .route("/profile/:id")
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.findById(req.params.id))
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    )

router
    .route("/profile/:id/follow")
    .post((req, res, next) => Promise.resolve()
        .then(() => Profile.findByIdAndUpdate(req.params.id, {followers: req.profile.id}))
        .then(data => Profile.findByIdAndUpdate(req.profile.id, {following: data.profile.id}))
        .then(data => res.status(200).send({message: "Profile followed"}))  
        .catch(err => next(err))  
    )



module.exports = router