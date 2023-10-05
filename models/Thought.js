const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//defining Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'thought required',
      minlength: 1,
      maxlength: 280 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      //  Mongoose will not include virtuals by default, so add a `virtuals` property and set it's value to true
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual method the get total reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return `reactions: ${this.reactions.length}`;
});


// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

//export Thought model
module.exports = Thought;