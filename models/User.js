const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: [true, "Email required"],
            unique: true,
            lowercase: true,  
            match: [/.+\@.+\..+/, 'email is not valid']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
//virtual method to get total frids count
UserSchema.virtual('friendCount').get(function () {
    return `friends: ${this.friends.length}`;
});

const User = model('User', UserSchema);
//export user model
module.exports = User;
