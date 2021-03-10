
exports.up = function(knex) {
    return knex.schema
        .createTable('contracts', table => {
            table.increments('id').primary()
            table.date('quote_date')
            table.date('expiration')
            table.decimal('strike')
            table.string('option_type', 3)
            table.decimal('open')
            table.decimal('high')
            table.decimal('low')
            table.decimal('close')
            table.decimal('trade_volume')
            table.decimal('bid_size_1545')
            table.decimal('bid_1545')
            table.decimal('ask_size_1545')
            table.decimal('ask_1545')
            table.decimal('underlying_bid_1545')
            table.decimal('underlying_ask_1545')
            table.decimal('implied_underlying_price_1545')
            table.decimal('active_underlying_price_1545')
            table.decimal('implied_volatility_1545')
            table.decimal('delta_1545')
            table.decimal('gamma_1545')
            table.decimal('theta_1545')
            table.decimal('vega_1545')
            table.decimal('rho_1545')
            table.decimal('bid_size_eod')
            table.decimal('bid_eod')
            table.decimal('ask_size_eod')
            table.decimal('ask_eod')
            table.decimal('underlying_bid_eod')
            table.decimal('underlying_ask_eod')
            table.decimal('vwap')
            table.decimal('open_interest')
            table.decimal('delivery_code')
        })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('contracts')
};

