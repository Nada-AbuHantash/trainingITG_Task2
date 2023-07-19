const Joi = require('joi');
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 50
    },
   
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        }
    ]

}
// , {
//     timestamps: true
// }
);

const Question = mongoose.model('Question', QuestionSchema);

function validateQuestion(Question) {
    const schema = {
      title: Joi.string().min(20).max(50).required(),
      options: Joi.objectId().min(2).max(4).required(),
    };
  
    return Joi.validate(Question, schema);
  }
  
exports.Question=Question;
exports.validate=validateQuestion;



