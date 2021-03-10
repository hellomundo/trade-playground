const router = require('express').Router()

const {
    getFiles,
    getFile
} = require('../controllers/files')

router.route('/files')
    .get(getFiles)
    //.post(addFile)

router.route('/files/:id')
    .get(getFile)

module.exports = router
