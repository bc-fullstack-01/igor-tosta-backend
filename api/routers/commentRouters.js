const express = require("express");
const {Post, Comments} = require("../model");


const router = express.Router();

router
    .route("/:postId/comments/:id")
    .get((req, res, next) => Promise.resolve()
        .then(() => Comments.findById(req.params.id))
        .then(data => res.status(200).json(data))
        .catch(err => next(err)))
    .put((req, res, next) => Promise.resolve()
        .then(() => Comments.findByIdAndUpdate(req.params.id, req.body,{runValidators: true} ))
        .then(() => res.status(200).send({message: "Updated a Comment!"}))
        .catch(err => next(err)))
    .delete((req, res, next) => Promise.resolve()
        .then(() => Comments.findById(req.params.id))
        .then(data => Post.findByIdAndUpdate(data.post,{$pull: {comments: data.id}}))
        .then(() => Comments.findByIdAndDelete(req.params.id))
        .then(() => res.status(200).send({message: "Successfully Deleted!"}))
        .catch(err => next(err)));

router
    .route("/:postId")
    .post((req, res, next) => Promise.resolve()
        .then(() => new  Comments(Object.assign(req.body, {post: req.params.postId})).save())
        .then(data => Post.findByIdAndUpdate(data.post,{$push: {comments: data}}))
        .then(() => res.status(201).send({message: "Created a Comment"}))
        .catch(err => next(err)));


module.exports = router;