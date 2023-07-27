const Joi = require('joi');
const mongoose = require('mongoose');
// const JoiArrayExtensions = require('joi-array-extensions');

const PollsSchema = new mongoose.Schema({
  title: {
    unique: true,
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50
  },
  options: {
    type: [{
      text: {
        unique: true,
        type: String,
        required: true,
        minlength: 0,
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
// Joi.extend(JoiArrayExtensions);

function validatePolls(poll) {
  const schema = {
    title: Joi.string().min(10).max(50).required(),

    options: Joi.array().items(
      {
        text: Joi.string().min(0).max(50).required(),
        votes: Joi.number().default(0)
      }
    ).min(2).required()
  };
  return Joi.validate(poll, schema);
};

exports.Polls=Polls;
exports.validate=validatePolls;


