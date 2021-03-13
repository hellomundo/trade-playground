const fs = require('fs')
const csv = require('fast-csv')
const from = require('pg-copy-streams').from

// should refactor to use models
const database = require('../data/db')
const { on } = require('../data/db')

const parseAndInsert = async (file) => {

    let totalRows = 0

    // format text into actual numbers
    const csvTypeTranformer = (row, next) => {
        return next(null, {
            quote_date: row.quote_date,
            expiration: row.expiration,
            strike: +row.strike,
            option_type: row.option_type,
            open: +row.open,
            high: +row.high,
            low: +row.low,
            close: +row.close,
            trade_volume: +row.trade_volume,
            bid_size_1545: +row.bid_size_1545,
            bid_1545: +row.bid_1545,
            ask_size_1545: +row.ask_size_1545,
            ask_1545: +row.ask_1545,
            underlying_bid_1545: +row.underlying_bid_1545,
            underlying_ask_1545: +row.underlying_ask_1545,
            implied_underlying_price_1545: +row.implied_underlying_price_1545,
            active_underlying_price_1545: +row.active_underlying_price_1545,
            implied_volatility_1545: +row.implied_volatility_1545,
            delta_1545: +row.delta_1545,
            gamma_1545: +row.gamma_1545,
            theta_1545: +row.theta_1545,
            vega_1545: +row.vega_1545,
            rho_1545: +row.rho_1545,
            bid_size_eod: +row.bid_size_eod,
            bid_eod: +row.bid_eod,
            ask_size_eod: +row.ask_size_eod,
            ask_eod: +row.ask_eod,
            underlying_bid_eod: +row.underlying_bid_eod,
            underlying_ask_eod: +row.underlying_ask_eod,
            vwap: +row.vwap,
            open_interest: +row.open_interest,
            delivery_code: +row.delivery_code          
        })
    }

    return new Promise((resolve, reject) => {

        database.client.pool.acquire().promise.then( client => {
            let startTime = Date.now()
            console.log("Starting CSV parse and insert at: "+startTime)
    
            function done(err) {
                database.client.pool.release(client)

                if (err) {
                    reject(err)
                } else {
                    const duration = Date.now() - startTime
                    console.log(`Parse and insert took ${duration} milliseconds`)
                    resolve(totalRows)
                }
            }
        
            const onParseCSVComplete = (rows) => {
                totalRows = rows
            }
    
            const copyQuery = "COPY contracts (quote_date, expiration, strike, option_type, "
                +"open, high, low, close, trade_volume, bid_size_1545, bid_1545, ask_size_1545, ask_1545, "
                +"underlying_bid_1545, underlying_ask_1545, implied_underlying_price_1545, active_underlying_price_1545, "
                +"implied_volatility_1545, delta_1545, gamma_1545, theta_1545, vega_1545, rho_1545, bid_size_eod, "
                +"bid_eod, ask_size_eod, ask_eod, underlying_bid_eod, underlying_ask_eod, vwap, open_interest, delivery_code)"
                +" FROM STDIN WITH (FORMAT csv)"
    
            const insertStream = client.query(from(copyQuery)) // insert inte database via pg-copy-streams
            const csvStream = csv.parse({headers:true}) // parse csv into an object
            const csvFormatStream = csv.format({headers:false}) // tweak and transform back into csv
            const inputStream = fs.createReadStream(file.path) // read file from file system
            //const outputStream = fs.createWriteStream('output.csv') // output to a csv file
    
            inputStream
                .pipe(csvStream)
                .on('error', done)
                .on('end', onParseCSVComplete)
                .pipe(csvFormatStream)
                .on('error', done)
                .transform(csvTypeTranformer)
                .on('error', done)
                .pipe(insertStream)
                //.pipe(outputStream)
                .on('error', done)
                //.on('data', (data) => console.log(data))
                .on('finish', done)
                .on('end', done)
        })
    })

}

module.exports = parseAndInsert
