const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true,
    },
   
});
userSchema.methods.generateAuthToken = function () {
    try {
        const token = jwt.sign({ email: this.email }, config.get('jwtPrivateKey'));
        return token;
    } catch (ex) {
        console.log(ex.message);
    }

}
const User = mongoose.model('User', userSchema);

function validateUser(user) {

    const schema = {
        //  name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}


exports.validate = validateUser;
exports.User = User;