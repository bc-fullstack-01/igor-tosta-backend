const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        post:
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "posts", required: true
        },
        content: 
        {
            type: String, 
            required: [true, "Comments content can't be empty"]
        }
    }
);

const comments = mongoose.model("comments", commentSchema);

module.exports = comments;