
const buildModel = require('../helpers/modelBuilder')

const table = 'files'
const selectableProps = [
    'id', 
    'date', 
    'file_name', 
    'file_size', 
    'rows',
 ]

module.exports = (db) => {

    const files = buildModel({db, table, selectableProps})

    // copy of 
    return {
        ...files
    }
    
}