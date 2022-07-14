const express = require("express");
const {Post} = require("../model")

const router = express.Router();

router
    .route("/feed")
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.find({profile: {$in : req.profile.following}}))
        .then((data) => res.status(200).json(data))
        .catch(err => next(err)))

module.exports = router