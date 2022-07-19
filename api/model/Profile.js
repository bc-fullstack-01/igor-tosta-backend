const {Schema, model} = require('mongoose');


const profileSchema = new Schema({
    name: {
        type: String, 
        required: true,
        minLength: 2
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', required: true
    },
    followers: [{
        type: Schema.Types.ObjectId, 
        ref: 'Profile'
    }],
    following: [{
        type: Schema.Types.ObjectId, 
        ref: 'Profile'
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

profileSchema.index({ name: 'text' });
module.exports = model('Profile', profileSchema);