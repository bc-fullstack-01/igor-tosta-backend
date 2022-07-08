const createError = require("http-errors");
const {user, Connection} = require("../model");

module.exports = {
    befforeAll:(req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => next()),
    getAll : (req,res, next) => Promise.resolve()
        .then(() => user.find({}))
        .then((data) => {
            res.render("user", {
                user: data
            })
        })
        .catch(err => next(err)),

    post : (req, res,next) => Promise.resolve()
        .then(() => new Post(req.body.user).save())
        .then(data =>{
            res.redirect(`user/${data._id}`)})
        .catch(err => next(err)),
    
    getPost : (req, res, next) => Promise.resolve()
        .then(() => user.findById(req.params.id))
        .then(data => {
            
            if (data){
                res.render("show_users", {user: data})
            }else{
                next(createError(404))
            }
        })
        .catch(err => next(err)),
    deletePost: (req, res, next) => Promise.resolve()
        .then(() => user.findByIdAndDelete(req.params.id))
        .then(() =>{
            res.redirect("/user")
        })
        .catch(err => next(err))
};