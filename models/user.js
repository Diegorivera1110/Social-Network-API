const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateForamt');

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        match: [/.+\@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Type.ObjectId,
            red: 'thoughts'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

const user = model('user', userSchema);

module.exports = user;