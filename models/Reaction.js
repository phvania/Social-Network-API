const { timeStamp } = require('console');
const { Schema, Types } = require('mongoose');


//defining Reaction schema
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()    

 //           default:  new Types.ObjectId()    
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
    
        },
    },
    {
        toJSON: {
          //  Mongoose will not include virtuals by default, so add a `virtuals` property and set it's value to true
          getters: true,
        },
        id: false,
      }
);

//export reactionSchema
module.exports = reactionSchema;








