const Schema = require('mongoose');

const connect = Schema.connect(`${process.env.MONGO_URL || "mongodb://localhost:27017/mydb_development"}`);

exports.Post = require('./Post.js');
exports.Comments = require('./Comments')
exports.User = require('./User')
exports.Profile = require('./Profile')

Schema.connection.on('error', () =>{
    console.error('Db error');
});
Schema.connection.on('connected', () =>{
    console.warn('connected');
});
Schema.connection.on('disconnected', () =>{
    console.error('Disconnected');
});
exports.Connection = connect;