const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        post:
        {
            type: mongoose.Schema.Types.ObjectId, ref: "posts", required: true
        },
        content: 
        {
            type: String, required: [true, "No empty comments allowed"]
        }
    }
);

const comments = mongoose.model("comments", commentSchema);

module.exports = comments;