
exports.up = function(knex) {
    return knex.schema
        .createTable('rollers', table => {
            table.increments('id').primary()
            table.timestamps()
        })
        .createTable('trades', table => {
            table.increments('id').primary()
            table.string('symbol').notNullable()
            table.integer('option_type').unsigned().defaultTo(1).notNullable()
            table.decimal('strike').notNullable()
            table.integer('quantity').unsigned().defaultTo(1).notNullable()
            table.date('expiration').notNullable()
            table.date('open_date').notNullable()
            table.date('close_date')
            table.decimal('open_price').notNullable()
            table.decimal('close_price')
            table.boolean('is_open').defaultTo(true).notNullable()
            table.integer('roller_id').unsigned().notNullable()
            table.foreign('roller_id').references('id').inTable('rollers')
        })
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('trades')
    .dropTable('rollers')
};
