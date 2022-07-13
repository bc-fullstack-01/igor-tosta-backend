const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2
        },
        user: {
            type: String,
            required: true,
            unique: true,
            minLength: 2
        },
        password: {
            type: String,
            required: true,
            minLength: 2
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }
);

const user = mongoose.model("user", userSchema);

module.exports = user;