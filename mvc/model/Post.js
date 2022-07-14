const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
    {
        title: 
        {
            type: String, 
            required: [true, "Title can't be empty"], 
            minLength: [5, `Title must be at least 5 characters, " {VALUE} " doesn't have the minimum size`]
        },
        content: 
        {
            type: String, required: [true, "Post content can't be empty"], 
            minLength: [5, `Content must be at least 5 characters, " {VALUE} " doesn't have the minimum size`]
        },
        comments: 
        [
            {
                type: mongoose.Schema.Types.ObjectId, ref:"comments"
            }
        ]
    }
);

const posts = mongoose.model("posts", postSchema);

module.exports = posts;