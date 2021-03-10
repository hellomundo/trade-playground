const { historical } = require('../models')
const parseAndInsert = require('../services/parseAndInsert')

const getHistorical = async (req, res, next) => {
    try {
        const results = await historical.findAll()
        console.log(results)
        return res.status(200).json(results)
    } catch (error) {
        console.log('error querying database')
        next(error)
    }
}

const uploadHistorical = async (req, res, next) => {
    try {
        const results = await parseAndInsert(req.file) // req.file
        return res.status(200).json(results)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getHistorical,
    uploadHistorical,
}