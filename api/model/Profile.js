const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema(
    {
        name:
        {
            type: String, 
            required: [true, "No empty name allowed"],
            minLength: [2, `Minimum of 2 characters, " {VALUE} " unmet quantity`]
        },
        user:
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref: "user", required: true
        },
        followers:
        [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "profile"
            }
        ],
        following:
        [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "profile"
            }
        ]
    }
);

const profile = mongoose.model("profile", profileSchema);

module.exports = profile;