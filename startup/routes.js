const express = require('express');
const polls = require('../routes/polls');
const error = require('../middleware/error');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use('/', polls); 
    app.use(error);
}