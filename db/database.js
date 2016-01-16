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
        return knex('employees').where('id', x);
    },

    outputWorkers: function () {
        return knex('employees');
    },

    addWorker: function(restId, first, last) {
        return knex('employees').insert({
            'rest_id': restId.trim(),
            'first_name': first.trim(),
            'last_name': last.trim(),
        });
    },

    editWorker: function(x, name, location, state, cuisine, rating, image, bio) {
        return knex('employees').where('id', x).update({
            'rest_id': restId.trim(),
            'first_name': first.trim(),
            'last_name': last.trim(),
        });
    },

    deleteWorker: function (x) {
        return knex('employees').where('id', x).del();
    }
}
