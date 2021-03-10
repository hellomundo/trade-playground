const router = require('express').Router()
const upload = require('../helpers/uploadHelper')


const {
    getHistorical,
    uploadHistorical
} = require('../controllers/historical')

router.route('/historical')
    .get(getHistorical)

    // could put middleware here
router.post('/historical/upload', upload.single('file'), uploadHistorical)
    

module.exports = router