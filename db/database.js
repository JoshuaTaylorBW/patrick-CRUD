// var knex = require('knex')({
//     client: 'postgresql',
//     connection: process.env.DATABASE_URL ||  'postgres://localhost/restaurants'
// })
var knex = require('./knex')

module.exports = {
    knex: knex,
    outputById: function (x) {
        return knex('the_table').where('id', x);
    },
    outputAll: function() {
        return knex('the_table');
    },

    addPlace: function(name, location, state, cuisine, rating, image, bio) {
        return knex('the_table').insert({
            'name': name.trim(),
            'location': location.trim(),
            'state': state.trim(),
            'cuisine': cuisine.trim(),
            'rating': rating.trim(),
            'image': image.trim(),
            'bio': bio.trim()
        });
    },

    editPlace: function(x, name, location, state, cuisine, rating, image, bio) {
        return knex('the_table').where('id', x).update({
            'name': name.trim(),
            'location': location.trim(),
            'state': state.trim(),
            'cuisine': cuisine.trim(),
            'rating': rating.trim(),
            'image': image.trim(),
            'bio': bio.trim()
        });
    },

    deletePlace: function (x) {
        return knex('the_table').where('id', x).del();
    },

    outputWorker: function (x) {
        return knex.from('employees').where('employees.id', x);
    },

    outputWorkers: function (x) {
        return knex.from('employees').innerJoin('the_table', 'employees.the_table_id', 'the_table.id').select('employees.id', 'employees.first_name', 'employees.last_name', 'employees.position', 'employees.the_table_id').where('the_table.id', x);
    },

    addWorker: function(restId, first, last, role) {
        return knex('employees').insert({
            'the_table_id': restId.trim(),
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
        return knex.from('reviews').innerJoin('the_table', 'reviews.the_table_id', 'the_table.id').select('reviews.id', 'reviews.review_title', 'reviews.review_rating', 'reviews.review_content', 'reviews.author_handle',  'reviews.the_table_id').where('the_table.id', x);
    },

    addReview: function(restId, title, rating, handle, content) {
        return knex('reviews').insert({
            'the_table_id': restId.trim(),
            'review_title': title.trim(),
            'review_rating': rating.trim(),
            'author_handle': handle.trim(),
            'review_content': content.trim()
        });
    },

    editReview: function(x, title, rating, handle, content) {
        return knex('reviews').where('id', x).update({
            'review_title': title.trim(),
            'review_rating': rating.trim(),
            'author_handle': handle.trim(),
            'review_content': content.trim()
        });
    },

    deleteReview: function (x) {
        return knex('reviews').where('id', x).del();
    }
}
