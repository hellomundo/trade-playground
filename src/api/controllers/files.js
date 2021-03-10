const { files } = require('../models')

const getFiles = async (req, res, next) => {
    try {
        const results = await files.all()
        console.log(results)
        return res.status(200).json(results)
    } catch (error) {
        console.log('error querying database')
        next(error)
    }
}

const getFile = async (req, res, next) => {
    try {
        const results = await files.findById(req.params.id)
        return res.status(200).json(results)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getFiles,
    getFile
}