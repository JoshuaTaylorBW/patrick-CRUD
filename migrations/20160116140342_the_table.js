
exports.up = function(knex, Promise) {
    return knex.schema.createTable('the_table', function(table) {
        table.increments();
        table.string('name');
        table.string('location');
        table.string('state');
        table.string('cuisine');
        table.integer('rating');
        table.text('image');
        table.text('bio');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('the_table');
};
