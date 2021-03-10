const router = require('express').Router()

const {
    getTrades,
    getTrade,
    createTrade,
    getRollers,
    createRoller,
} = require('../controllers/trades')

router.route('/trades')
    .get(getTrades)
    //.post(getTrades)

router.route('/trades/:id')
    .get(getTrade)

router.route('/trades')
    .post(createTrade)

router.route('/roller')
    .get(getRollers)
    .post(createRoller)

module.exports = router