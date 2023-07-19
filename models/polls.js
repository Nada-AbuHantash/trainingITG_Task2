const Joi = require('joi');
const mongoose = require('mongoose');

const PollsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50
  },
  options: {
    type: [{
      text: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
      votes: {
        type: Number,
        default: 0
      }
    }],
   
    required: true
  }}, {
    timestamps: true 
  
});


const Polls = mongoose.model('Polls', PollsSchema);


function validatePolls(poll) {
  const schema = {
    title: Joi.string().min(10).max(50).required(),

    options: Joi.array().items(
      {
        text: Joi.string().min(3).max(50).required(),
        votes: Joi.number().default(0)
      }
    ).min(2).required()
  };
  return Joi.validate(poll, schema);
};

exports.Polls=Polls;
exports.validate=validatePolls;


