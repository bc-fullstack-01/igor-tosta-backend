const moongose = require("mongoose");

const connect = moongose.connect("mongodb://127.0.0.1:27017/mydb_development");

exports.Post = require("./Post.js");
exports.Comments = require("./Comments")
exports.User = require("./User")
exports.Profile = require("./Profile")

moongose.connection.on("error", () =>{
    console.error("Db error");
});
moongose.connection.on("connected", () =>{
    console.warn("connected");
});
moongose.connection.on("disconnected", () =>{
    console.error("Disconnected");
});
exports.Connection = connect;