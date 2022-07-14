const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: [true, "No empty posts allowed"], 
            minLength: [2, `Minimum of 2 characters, " {VALUE} " unmet quantity`]
        },
        content: {
            type: String, required: [true, "Post content can't be empty"], 
            minLength: [2, `Minimum of 2 characters, " {VALUE} " unmet quantity`]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profile', required: true
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "comments"
            }
        ]
    }
);

const posts = mongoose.model("posts", postSchema);

module.exports = posts;