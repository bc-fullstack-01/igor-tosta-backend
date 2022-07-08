const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: true
        },
        content: {
            type: String, 
            required: true
        }
    }
);

const user = mongoose.model("user", userSchema);

module.exports = user;