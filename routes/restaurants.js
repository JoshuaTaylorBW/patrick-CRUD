var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var database = require('../db/database');

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

router.get('/restaurants/:id/', function (req, res, next) {
    var id = req.params.id;
    database.outputById(id).then(function(result) {
        database.outputReviews(id).then(function(payload) {
            res.render('restaurants/show', {restaurant: result[0], reviews: payload})
        })
    })
})

router.get('/restaurants/:id/newreview', function (req, res, next) {
    var restId = req.params.id;
    res.render('restaurants/newreview', {restaurant: restId})
})

router.post('/restaurants/:id/newreview', function (req, res, next) {
    var restId = req.params.id;
    var title = req.body.review_title;
    var rating = req.body.review_rating;
    var handle = req.body.author_handle;
    var content = req.body.review_content;
    database.addReview(restId, title, rating, handle, content).then(function (result) {
        res.redirect('/restaurants/' + restId);
    })
})

router.get('/restaurants/:id/reviews/:rid', function(req, res, next) {
    var revid = req.params.rid;
    database.outputReview(revid).then(function (result) {
        res.render('restaurants/showreview', {review: result[0]});
    })
})

router.get('/restaurants/:id/reviews/:rid/edit', function(req, res, next) {
    var revid = req.params.rid;
    database.outputReview(revid).then(function (result) {
        res.render('restaurants/editreview', {review: result[0]});
    })
})

router.post('/restaurants/:id/reviews/del/:rid', function(req, res, next) {
    var revid = req.params.rid;
    var id = req.params.id;
    database.deleteReview(revid).then(function (result) {
        res.redirect('/restaurants/' + id);
    })
})

router.get('/restaurants/:id/edit/', function (req, res, next) {
    var id = req.params.id;
    database.outputById(id).then(function(result) {
        res.render('restaurants/edit', {restaurant: result[0]})
    })
})

router.post('/restaurants/:id/editreview', function (req, res, next) {
    var restId = req.params.id;
    var revId = req.body.revId;
    var title = req.body.review_title;
    var rating = req.body.review_rating;
    var handle = req.body.author_handle;
    var content = req.body.review_content;
    database.editReview(revId, title, rating, handle, content).then(function (result) {
        res.redirect('/restaurants/' + restId);
    })
})

router.post('/restaurants/:id/', function (req, res, next) {
    var x = req.params.id;
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
        res.redirect('/restaurants/' + x);
    })
})

router.post('/restaurants/del/:id/', function (req, res, next) {
    var id = req.params.id;
    database.deletePlace(id).then(function(result) {
        res.redirect('/restaurants/all/');
    })
})

router.get('/admin/', function (req, res, next) {
    database.outputAll().then(function(result) {
        res.render('restaurants/admin', {restaurants: result})
    })
})

router.get('/admin/:id/manage', function (req, res, next) {
    var id = req.params.id;
    database.outputWorkers(id).then(function(result) {
        database.outputById(id).then(function(payload) {
            var chow = payload[0];
            res.render('restaurants/allworkers', {restaurant: chow, workers: result})
        })
    })
})

router.get('/admin/:id/new', function (req, res, next) {
    var id = req.params.id;
    database.outputById(id).then(function (result) {
        res.render('restaurants/newworker', {restaurant: result[0]})
    })
})

router.post('/admin/:id/manage', function (req, res, next) {
    var id = req.params.id;
    var rest_id = req.body.restId;
    var first = req.body.first_name;
    var last = req.body.last_name;
    var role = req.body.position;
    database.addWorker(rest_id, first, last, role).then(function(result) {
        res.redirect('/admin/' + id + '/manage')
    })
        })

router.get('/admin/workers/:id', function (req, res, next) {
    var id = req.params.id;
    database.outputWorker(id).then(function (result) {
        res.render('restaurants/showworker', {worker: result[0]})
    })
})

router.post('/admin/workers/del/:id', function (req, res, next) {
    var id = req.params.id;
    var restId = req.body.restId;
    database.deleteWorker(id).then(function (result) {
        res.redirect('/admin/' + restId + '/manage')
    })
})

router.get('/admin/workers/:id/edit', function (req, res, next) {
    var id = req.params.id;
    database.outputWorker(id).then(function (result) {
        res.render('restaurants/editworker', {worker: result[0]})
    })
})

router.post('/admin/workers/:id', function (req, res, next) {
    var id = req.params.id;
    var first = req.body.first_name;
    var last = req.body.last_name;
    var role = req.body.position;
    database.editWorker(id, first, last, role).then(function (result) {
        res.redirect('/admin/workers/' + id);
    })
})

module.exports = router;
