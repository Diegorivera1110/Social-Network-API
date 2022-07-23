const { ObjectId } = require('mongodb');
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema ({
    thoughtBody: {
        type: String,
        required: true,
        maxlength: 245,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        require: true
    },
    reactions: [reactionsSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true,
        maxlength: 180,
        minlength: 1
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
});


const thought = model('thought', thoughtSchema);

module.exports = thought;