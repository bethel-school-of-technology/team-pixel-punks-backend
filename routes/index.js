var express = require('express');
const { registerAsyncHelper } = require('hbs');
var router = express.Router();
var mysql = require('mysql2');
const models = require('../models');
var passport = require('../services/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
