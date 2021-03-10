
const buildModel = require('../helpers/modelBuilder')

const table = 'rollers'
const selectableProps = ['id']

module.exports = (db) => {

    const rollers = buildModel({db, table, selectableProps})

    // copy of 
    return {
        ...rollers
    }
    
}