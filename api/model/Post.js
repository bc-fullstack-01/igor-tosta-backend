const {Schema, model} = require('mongoose');


const postSchema = new Schema({
    title: {
        type: String, 
        required: true, 
        minLength: 2
    },
    description: {
        type: String, required: true,
        minLength: 2
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile', 
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    image: [{
        type: Boolean,
        default: false
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Post', postSchema);