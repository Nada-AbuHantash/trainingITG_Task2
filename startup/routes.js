const express = require('express');
const polls = require('../routes/polls');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', polls); 
    app.use('/polls', polls); 
    app.use(error);
}