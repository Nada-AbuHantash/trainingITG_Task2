const Joi = require('joi');
const { Polls, validate } = require('../models/polls');
const checkUniqueOptins= require('../middleware/uniqueOption');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let msg = " ";

router.get('/polls/new', async (req, res) => {
  res.render('creatPoll', { msg });
});
router.post('/polls/new',checkUniqueOptins,async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let poll = await Polls.findOne({ title: req.body.title })
    if (poll) return res.status(400).send('the poll already exite');

    
   poll = new Polls({
    title: req.body.title,
    options: req.body.options
  });
  poll = await poll.save();

  res.json(poll);

});

router.get('/polls/:id', async (req, res) => {
  const poll = await Polls.findById(req.params.id);

  if (!poll)return res.status(404).send('The poll with the given ID was not found.');

  return res.render('vote', { poll });

});

router.post('/polls/:id', async (req, res) => {
  const selectedOption = req.body.options;

  const poll = await Polls.findById(req.params.id);
  if (!poll)  return res.status(404).send('The poll with the given ID was not found.');

  const option = poll.options.find(option => option._id.toString() === selectedOption);
  if (!option) return res.status(404).send('The option with the given ID was not found.');

  option.votes += 1;
  await poll.save();
 
  res.render('viewVote', { poll });

});

router.get('/', async (req, res) => {
  const mostActivePolls = await Polls
    .find()
    .sort({ 'options.votes': -1 })
    .limit(3);

  const allPolls = await Polls
    .find()
    .sort({ createdAt: -1 });


  if (!mostActivePolls) return res.status(404).send('The poll with the given ID was not found.');
  if (!allPolls) return res.status(404).send('The poll with the given ID was not found.');

  res.render('home', { mostActivePolls, allPolls });

});

module.exports = router;