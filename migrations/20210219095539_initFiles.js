
exports.up = function(knex) {
  return knex.schema
    .createTable('files', table => {
        table.increments('id').primary()
        table.date('date').notNullable()
        table.string('file_name', 255).notNullable()
        table.string('original_file_name', 255).notNullable()
        table.integer('file_size')
        table.integer('rows')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('files')
};
