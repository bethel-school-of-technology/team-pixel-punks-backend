const jwt = require('jsonwebtoken');
const { userInfo } = require('os');
const models = require('../models');
const bcrypt = require("bcryptjs");

const { User } = require("../models");

//define the object that does the authentication service
var authService = {

  //creates a jwt token for the user to use, allows them access
  signUser: function(user) {
    const token = jwt.sign(
      {
        Email: user.Email,
        UserId: user.UserId,
        FirstName: user.FirstName,
        LastName: user.LastName
      },
      'secretkey',
      {
        expiresIn: '1h'
      }
    );
    return token;
  },

  //verify the user is authorized
  verifyUser: function (token) {  //<--- receive JWT token as parameter
    try {
      let decoded = jwt.verify(token, 'secretkey'); //<--- Decrypt token using same key used to encrypt
      return models.users.findByPk(decoded.UserId); //<--- Return result of database query as promise
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  //encrypt the password
  hashPassword: function(plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  //rehash entered password and compare it to the one from the 
  //database
  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword)
  }
  
  
}

module.exports = authService;