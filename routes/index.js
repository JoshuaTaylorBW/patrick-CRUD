var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/restaurants')
});

module.exports = router;