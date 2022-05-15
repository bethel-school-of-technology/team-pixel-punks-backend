var express = require('express');
const { registerAsyncHelper } = require('hbs');
var router = express.Router();
var mysql = require('mysql2');
const models = require('../models');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//from the create an account page, take in the data from the form
//create row in database
router.post('/sign-up', function (req, res, next) {
  models.users.create(req.body)
    .then(newUser => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(newUser));
    })
    .catch(err => {
      res.status(400);
      res.send(err.message);
    });
});

router.post('/login', function(req, res, next) {
  models.users
    .findOne({
      where: {
        Username: req.body.username,
        Password: req.body.password
      }
    })
    .then(user => {
      if (user) {
        res.send('Login succeeded!');
      } else {
        res.send('Invalid login!');
      }
    });
});

module.exports = router;
