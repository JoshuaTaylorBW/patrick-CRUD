var express = require('express');
var router = express.Router();
var database = require('../database');

router.get('/restaurants/', function(req, res, next) {
    database.outputAll().then(function(result) {
        res.render('restaurants/index', {restaurants: result});
    })
});

router.get('/restaurants/all/', function(req, res, next) {
    database.outputAll().then(function(result) {
        res.render('restaurants/all', {restaurants: result});
    })
});

router.get('/restaurants/new/', function(req, res, next) {
  res.render('restaurants/new');
});

router.post('/restaurants/', function(req, res, next) {
    var name = req.body.name;
    var location = req.body.location;
    var state = req.body.state;
    var cuisine = req.body.cuisine;
    var rating = req.body.rating;
    if (req.body.image.length > 0) {
    var image = req.body.image;
} else {
    var image = "http://www.placehold.it/225x225"
}
    var bio = req.body.bio;
    database.addPlace(name, location, state, cuisine, rating, image, bio).then(function(result){
        res.redirect('/restaurants/all/')
    })
})

router.get('/restaurants/:name/', function (req, res, next) {
    var name = req.params.name;
    database.outputByName(name).then(function(result) {
        res.render('restaurants/show', {restaurant: result[0]})
    })
})

router.get('/restaurants/:name/edit/', function (req, res, next) {
    var name = req.params.name;
    database.outputByName(name).then(function(result) {
        res.render('restaurants/edit', {restaurant: result[0]})
    })
})

router.post('/restaurants/:name/', function (req, res, next) {
    var x = req.params.name;
    var name = req.body.name;
    var location = req.body.location;
    var state = req.body.state;
    var cuisine = req.body.cuisine;
    var rating = req.body.rating;
    if (req.body.image.length > 0) {
    var image = req.body.image;
} else {
    var image = "http://www.placehold.it/225x225"
}
    var bio = req.body.bio;
    database.editPlace(x, name, location, state, cuisine, rating, image, bio).then(function(result) {
        res.redirect('/restaurants/' + name);
    })
})

router.post('/restaurants/del/:name/', function (req, res, next) {
    var name = req.params.name;
    database.deletePlace(name).then(function(result) {
        res.redirect('/restaurants/all/');
    })
})

module.exports = router;
