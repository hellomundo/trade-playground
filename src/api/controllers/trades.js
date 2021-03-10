//const { db } = require('../data/db')
const { trades, rollers } = require('../models')

const getTrades = async (req, res, next) => {
    try {
        const results = await trades.findAll()
        console.log(results)
        return res.status(200).json(results)
    } catch (error) {
        console.log('error querying database')
        next(error)
    }
}

const getTrade = async (req, res, next) => {
    try {
        const results = await trades.findById(req.params.id)
        return res.status(200).json(results)
    } catch (error) {
        next(error)
    }
}

const createTrade = async(req, res, next) => {
    try {
        console.log('got params');
        console.log(req.params);
        //const results = await trades.create(req.params)
    } catch(error) {
        next(error)
    }
}

const createRoller = async (req, res, next) => {
    try {
        // returns an array of length 1
        const results = await rollers.create()
        return res.status(200).json(results[0])
    } catch (error) {
        next(error)
    }
}

const getRollers = async (req, res, next) => {
    try {
        const results = await rollers.all()
        return res.status(200).json(results)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTrades,
    getTrade,
    createTrade,
    getRollers,
    createRoller
}