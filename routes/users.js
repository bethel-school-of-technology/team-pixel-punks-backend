var express = require('express');
const Connection = require('mysql/lib/Connection');
var router = express.Router();
const models = require('../models');
var passport = require('../services/passport');
var authService = require('../services/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//render the signup page when navigating there
router.get('/sign-up', function (req, res, next) {
  res.render('sign-up');
});

//take in form for signing up for a new user and redirect
//to the login page
router.post('/sign-up', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Email: req.body.email
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function (response, created) { //should this be res instead of result?
      if (created) {
        res.redirect('login');
      } else {
        res.send('This user already exists');
      }
    });
});

//render the login page when navigating to this route
router.get('/login', function (req, res, next) {
  res.render('login');
});

//take in username and password, authenticate the user or give them the boot
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Email: req.body.email
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.redirect('profile');
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

router.put('/locations/:id', function(req, res) {
  let userId = parseInt(req.params.id);
  models.users
  .update(req.body, { where: { UserId: userId } })
    .then(result => res.redirect('/users/logout'))
    .catch(err => {
      res.status(400);
      res.send("there was a problem, sound the alarms!");
    })
});

//profile route will need to be changed to /locations when connecting
//to the front end, i used the one from the lesson to get it working
//for now.
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
          //need to get all locations that have the same userid of user.userid
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});


//route for logging the user out, and clearing the jwt token
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

module.exports = router;
