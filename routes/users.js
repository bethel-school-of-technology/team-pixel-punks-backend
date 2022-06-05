var express = require('express');
const Connection = require('mysql/lib/Connection');
var router = express.Router();
const models = require('../models');
var passport = require('../services/passport');
var authService = require('../services/auth');
const bcrypt = require('bcryptjs/dist/bcrypt');

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
    .then(function (res, created) { //should this be res instead of result?
      if (created) {
        res.send('user created');
        console.log('user created');
      } else {
        console.log('error');
        res.send('this user already exists');
      }
    });
  res.send('great job!');
});

//take in username and password, authenticate the user or give them the boot
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Email: req.body.email
    }
  }).then(async user => {
    
    if (!user) {
      console.log('no user found');
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);

      if (passwordMatch) {
        const token = authService.signUser(user);
        res.status(200).cookie('jwt', token).send({token, user});
      } else {
        res.status(401).send('invalid login');
      }
    }
  })
});

//gather all locations from locations table for a given userId
router.get('/locations', function (req, res) {
  let token = req.headers.authorization;
  authService.verifyUser(token).then(user => {
    if (user) {
      //res.send(JSON.stringify(user));
      //console.log(user.userId);
      models.locations.findAll({
        where: {
          UserId: user.UserId,
          Deleted: false
        }
      }).then(locationsFound => {
        //res.setHeader('Content-Type', 'applications/json');
        res.send({user: user, locations: locationsFound});
      })
    } else {
      res.status(401).send('must be logged in');
    }
  })

})

//route for adding a new location will need to be secured once connected to the front end
//once the front end is able to send the userid, lat,long along with the zipcode, we can
//substitute the code bellow that is commented out.
router.post('/add-location', function (req, res, next) {
  models.locations.findOrCreate({
    where: {
      Zipcode: req.body.zipcode
    },
    defaults: { UserId: req.body.userId}
  })
    .then((result, created) => {
      if (created) {
        res.send('New location added!');
      } else {
        res.send('Could not add location!');
      }
    });
});

//route to change deleted attribute to true.  
router.post('/delete-location', function (req, res) {
  //add authentication check here
  models.locations
    .update(
      { Deleted: true },
      { where: { LocationId: req.body.id } })
});

//route for logging the user out, and clearing the jwt token
router.get('/logout', function (req, res, next) {
  token = "";
  res.send(token);
  console.log('Logged out');
});

router.put('/update-city', function(req, res) {
  //add authentication here
  console.log(req.body.city)
  models.locations
  .update(
    { City: req.body.city },
    { where: { LocationId: req.body.locationId.id } })
});

module.exports = router;
