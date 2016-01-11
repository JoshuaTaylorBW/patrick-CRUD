var knex = require('knex')({
    client: 'postgresql',
    connection: process.env.DATABASE_URL ||  'postgres://localhost/restaurants'
})

module.exports = {
    knex: knex,
    outputByName: function (x) {
        return knex('the_table').where('name', x);
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
        return knex('the_table').where('name', x).update({
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
        return knex('the_table').where('name', x).del();
    }
}
