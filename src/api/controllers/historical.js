const e = require('../utils/customErrors')()
const { historical } = require('../models')
const parseAndInsert = require('../services/parseAndInsert')
const { files } = require('../models')

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
        // check if file has already been uploaded
        console.log("got request....");
        console.log(req.body);
        const alreadyUploaded = await files.hasFile(req.file.filename)
        if(alreadyUploaded) {
            throw e.serverError(`The file ${req.file.filename} has already been uploaded.`)
        } else {
            const totalRows = await parseAndInsert(req.file) // req.file
            console.log("uploaded data:::::")
            console.log(totalRows);
            const recorded = await files.create({
                date: req.body.date,
                original_file_name: req.file.filename,
                file_name: req.file.path,
                file_size: req.file.size,
                rows: totalRows
            })
            return res.status(200).json(recorded)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getHistorical,
    uploadHistorical,
}