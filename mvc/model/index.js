const moongose = require("mongoose");

const connect = moongose.connect("mongodb://127.0.0.1:27017/mydb_development");
exports.user = require("./user.js");

moongose.connection.on("error", (args) =>{
    console.error(`${JSON.stringify(args)}`);
})
moongose.connection.on("connected", (args) =>{
    console.warn(` foi conectado ${JSON.stringify(args)}`);
})
moongose.connection.on("disconnected", (args) =>{
    console.error(`${JSON.stringify(args)}`);
})  
exports.Connection = connect;