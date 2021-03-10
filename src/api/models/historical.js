const historical = (db) => {
    const findAll = () => {
        return db('contracts')
    }

    const findByDate = (date) => {
        return db('contracts').where({quote_date: date})
    }

    return {
        findAll,
        findByDate,
        // insert row
    }
}

module.exports = historical