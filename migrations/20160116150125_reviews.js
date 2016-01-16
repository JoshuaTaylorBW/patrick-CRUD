
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', function(table) {
        table.increments();
        table.integer('the_table_id');
        table.string('review_title');
        table.integer('review_rating');
        table.string('author_handle');
        table.text('review_content');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reviews')
};
