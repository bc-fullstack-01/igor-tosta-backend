const {Comments, Connection, Post} = require("../model");


module.exports = {
    befforeAll: (req, res, next) =>Promise.resolve()
        .then(() => Connection.then())
        .then(() => next()),
    getComment: (req, res, next) => Promise.resolve()
        .then(() => Comments.findById(req.params.id))
        .then(data =>{
            res.render("show_comment", {
                comment: data
            })
        })
        .catch(err => next(err)),
    post: (req, res, next) => Promise.resolve()
        .then(() => new  Comments(Object.assign(req.body.comment, {post: req.params.postId})).save())
        .then(data => Post.findByIdAndUpdate(data.post,{$push: {comments: data}}))
        .then(() => res.redirect(`/posts/${req.params.postId}`))
        .catch(err => next(err)),
    updateComment: (req, res, next) => Promise.resolve()
        .then(() => Comments.findByIdAndUpdate(req.params.id, req.body.comment,{runValidators: true} ))
        .then(() => res.redirect(`/posts/${req.params.postId}`))
        .catch(err => next(err)),
    deleteComment: (req, res, next) => Promise.resolve()
        .then(() => Comments.findByIdAndDelete(req.params.id))
        .then(() => res.redirect(`/posts/${req.params.postId}`))
        .catch(err => next(err))
};