

const buildModel = require('../helpers/modelBuilder')

const table = 'trades'
const selectableProps = [
    'id', 
    'symbol', 
    'strike', 
    'option_type', 
    'expiration',
    'quantity', 
    'open_price', 
    'close_price', 
    'open_date', 
    'close_date', 
    'is_open',
    'roller_id'
 ]

module.exports = (db) => {

    const trades = buildModel({db, table, selectableProps})

    // copy of 
    return {
        ...trades
    }
    
}