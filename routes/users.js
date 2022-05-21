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
  console.log(req.body.email)
  models.users.findOne({
    where: {
      Email: req.body.email
    }
  }).then(user => {
    console.log(user)
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
    

      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
 
      if (passwordMatch) {
        let token = authService.signUser(user);
        console.log(token)
        res.json({jwt: token});
        // res.redirect('profile');
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

//profile route will need to be changed to /locations when connecting
//to the front end, i used the one from the lesson to get it working
//for now.
router.get('/locations', function (req, res, next) {
  let token = req.body.jwt;
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

//not sure if these 2 add-location routes are working
router.get('/add-location', function (req, res, next) {
  // let token = req.body.jwt;
  // if (token) {
  //   authService.verifyUser(token)
  //     .then(user => {
  //       if (user) {
  //         res.render('locations', {
  //           Zipcode: locations.Zipcode
  //         });
  //       } else {
  //         res.status(401);
  //         res.send('Invalid authentication token');
  //       }
  //     });
  // } else {
  //   res.status(401);
  //   res.send('Must be logged in');
  // }
  res.render('add-location');
});

//route for adding a new location 
router.post('/add-location', function (req, res, next) {
  models.locations.findOrCreate({
    where: {
      Zipcode: req.body.zipcode,
      UserId: 4, //req.body.userId,  substitute this in when connecting to front end.
      Latitude: "38.536",  //req.body.latitude, substitute this in when connecting to front end.
      Longitude: "-104.654" //req.body.longitude  substitute this in when connecting to front end.
    }
  })
  .spread(function (result, created) {
    if (created) {
      res.send('New location added!');
    } else {
      res.send('Could not add location!');
    }
  });
});


//route for logging the user out, and clearing the jwt token
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

module.exports = router;
