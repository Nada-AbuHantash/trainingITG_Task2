const Joi = require('joi');
const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({

    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    text: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    votes: {
        type: Number,
       
    }

}
// , {
//     timestamps: true
// }
);

const Option = mongoose.model('Option', OptionSchema);


function validateOption(Option) {
    const schema = {
      question: Joi.objectId().required(),
      text: Joi.string().min(10).max(50).required(),
      
    };
  
    return Joi.validate(customer, schema);
  }
  exports.Option=Option;
  exports.validate=validateOption;
  
