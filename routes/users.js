const Joi = require('joi');
const brcypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res, resp) => {
    res.render('login');
});

router.post('/', async (req, res, resp) => {
 
   
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('the email already exite');


    const isValid = await brcypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('invalied email or password');

    req.session.useremail = req.body.email;
  
    const token = user.generateAuthToken();
    req.session.auth=token;
    res.redirect('/'); 

});


// router.post('/new', async (req, res) => {

//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let user = await User.findOne({ email: req.body.email })
//     if (user) return res.status(400).send('the email already exite');
//     user = new User(
//         _.pick(req.body, ['name', 'email', 'password'])
//     );
//     const salt = await brcypt.genSalt(10);
//     user.password = await brcypt.hash(user.password, salt);
//     await user.save();
//     // const token = user.generateAuthToken();
//     res.send(
//         _.pick(user, ['name', 'email', '_id'])
//     );
//   ;
// });
module.exports = router;