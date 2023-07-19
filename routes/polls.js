const Joi = require('joi');
const {Polls,validate}=require('../models/polls');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 


router.post('/new', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let poll = new Polls({ 
        title: req.body.title,
        options:req.body.options
      });
      poll = await poll.save();
      
      res.send(poll);
});

router.get('/:id',async(req,res)=>{
    const poll = await Polls.findById(req.params.id);

  if (!poll) return res.status(404).send('The poll with the given ID was not found.');

  res.send(poll);

});

router.post('/:id',async(req,res)=>{
    const selectedOption = req.body.option;
    const poll = await Polls.findById(req.params.id);

  if (!poll) return res.status(404).send('The poll with the given ID was not found.');

  const option = poll.options.find(option => option._id.toString() === selectedOption);
  if (!option) return res.status(404).send('The option with the given ID was not found.');

  option.votes += 1;
  await poll.save();
  res.send(poll);

});

module.exports = router;