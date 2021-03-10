const db = require('../data/db')

const trades = require('./trades')(db)
const files = require('./files')(db)
const historical = require('./historical')(db)
const rollers = require('./rollers')(db)

module.exports = {
    //models
    trades,
    files,
    historical,
    rollers
}