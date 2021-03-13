
const buildModel = require('../helpers/modelBuilder')

const table = 'files'
const selectableProps = [
    'id', 
    'date', 
    'file_name', 
    'original_file_name',
    'file_size', 
    'rows',
 ]


module.exports = (db) => {

    const files = buildModel({db, table, selectableProps})

    const hasFile = async (filename) => {
        console.log(`Checking to see if ${filename} is in the files database.`);
        const results = await db(table).where({original_file_name: filename})
        console.log(`results of file search for ${filename}...`);
        console.log(results);
        return results.length > 0
     }
    
    return {
        ...files,
        hasFile
    }
    
}