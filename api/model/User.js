const {Schema, model} = require('mongoose');


const userSchema = new Schema({
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
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', userSchema);