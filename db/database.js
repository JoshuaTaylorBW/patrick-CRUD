// var knex = require('knex')({
//     client: 'postgresql',
//     connection: process.env.DATABASE_URL ||  'postgres://localhost/restaurants'
// })
var knex = require('./knex')

module.exports = {
    knex: knex,
    outputById: function (x) {
        return knex('restaurants').where('id', x);
    },
    outputAll: function() {
        return knex('restaurants');
    },

    addPlace: function(name, location, state, cuisine, rating, image, bio) {
        return knex('restaurants').insert({
            'name': name.trim(),
            'location': location.trim(),
            'description': bio.trim(),
            'rating': rating.trim(),
            'type': cuisine.trim(),
            'url': image.trim(),
        });
    },

    editPlace: function(x, name, location, state, cuisine, rating, image, bio) {
        return knex('restaurants').where('id', x).update({
          'name': name.trim(),
          'location': location.trim(),
          'description': bio.trim(),
          'rating': rating.trim(),
          'type': cuisine.trim(),
          'url': image.trim(),
        });
    },

    deletePlace: function (x) {
        return knex('food').where('id', x).del();
    },

    outputWorker: function (x) {
        return knex.from('employees').where('employees.id', x);
    },

    outputWorkers: function (x) {
        return knex.from('employees').innerJoin('restaurants', 'employees.restaurants_id', 'restaurants.id').select('employees.id', 'employees.first_name', 'employees.last_name', 'employees.position', 'employees.restaurants_id').where('restaurants.id', "'"+x+"'");
    },

    addWorker: function(restId, first, last, role) {
        return knex('employees').insert({
            'food_id': restId.trim(),
            'first_name': first.trim(),
            'last_name': last.trim(),
            'position': role.trim()
        });
    },

    editWorker: function(x, first, last, role) {
        return knex('employees').where('id', x).update({
            'first_name': first.trim(),
            'last_name': last.trim(),
            'position': role.trim()
        });
    },

    deleteWorker: function (x) {
        return knex('employees').where('id', x).del();
    },

    outputReview: function (x) {
        return knex.from('reviews').where('reviews.id', x);
    },

    outputReviews: function (x) {
      console.log(x);
        return knex.from('reviews').innerJoin('restaurants', 'reviews.restaurants_id', 'restaurants.id').select('reviews.id', 'reviews.stars', 'reviews.review', 'reviews.users_name',  'reviews.restaurants_id').where('restaurants.id', x.toString());
    },

    addReview: function(restId, title, rating, handle, content) {
        return knex('reviews').insert({
            'restaurants_id': restId.trim(),
            'stars': rating.trim(),
            'users_name': handle.trim(),
            'review': content.trim()
        });
    },

    editReview: function(x, title, rating, handle, content) {
        return knex('reviews').where('id', x).update({
            'stars': rating.trim(),
            'users_name': handle.trim(),
            'review': content.trim()
        });
    },

    deleteReview: function (x) {
        return knex('reviews').where('id', x).del();
    }
}
