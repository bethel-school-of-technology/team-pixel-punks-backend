var express = require('express');
const Connection = require('mysql/lib/Connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
