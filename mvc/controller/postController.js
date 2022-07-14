const {Post, Connection, Comments} = require("../model");

module.exports = {
    befforeAll:(req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next()),
    getAll : (req,res, next) => Promise.resolve()
        .then(() => Post.find({}))
        .then((data) => {
            res.render("posts", {
                posts: data
            })
        })
        .catch(err => next(err)),

    post : (req, res,next) => Promise.resolve()
        .then(() => new Post(req.body.post).save())
        .then(data =>{
            res.redirect(`posts/${data._id}`)})
        .catch(err => next(err)),
    
    getPost : (req, res, next) => Promise.resolve()
        .then(() => Post.findById(req.params.id))
        .then(data => 
            Comments.find({id:data.comments})
            .then(comments => {
                res.render("show_post", {
                post: data,
                comments: comments
                })
            })
        )
        .catch(err => next(err)),
    deletePost: (req, res, next) => Promise.resolve()
        .then(() => Post.findByIdAndDelete(req.params.id))
        .then(() => Comments.find({post: req.params.id}))
        .then(comments => comments.forEach( comment =>{
            comment.delete()
        }))
        .then(() =>{
            res.redirect("/posts")
        })
        .catch(err => next(err)),
    updatePost: (req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate(req.params.id, req.body.post,{
        runValidators: true
    }))
    .then(() =>{
        res.redirect(`/posts/${req.params.id}`)
    })
    .catch(err => next(err))
};