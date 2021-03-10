const fs = require('fs')
const csv = require('fast-csv')
const from = require('pg-copy-streams').from

// should refactor to use models
const database = require('../data/db')
const { on } = require('../data/db')

const parseAndInsert = async (file) => {

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

    database.client.pool.acquire().promise.then( client => {
        let startTime = Date.now()
        console.log("Starting CSV parse and insert at: "+startTime)

        function done(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("success")
            }
            console.log("Ending CSV parse and insert at: "+Date.now())

            database.client.pool.release(client)
        }

        const ping = (msg) => {
            console.log("ping" + msg)
        }
          
        const insertStream = client.query(from("COPY contracts FROM STDIN WITH (FORMAT csv)"))
        const csvStream = csv.parse({headers:true})
        const csvFormatStream = csv.format({headers:true})
        const inputStream = fs.createReadStream(file.path)
        const outputStream = fs.createWriteStream('output.csv')

        // inputStream.on('error', done)
        // csvStream.on('error', done)
        // csvFormatStream.on('error', done)
        // insertStream.on('error', done)
        // insertStream.on('finish', done)
        // outputStream.on('end', done)
        // outputStream.on('error', done)

        //fileStream.pipe(csvStream).pipe(csvFormatStream).pipe(insertStream)
        inputStream
            .pipe(csvStream)
            .on('error', done)
            .on('end', ping)
            .pipe(csvFormatStream)
            .on('error', done)
            .on('end', ping)
            .transform(csvTypeTranformer)
            .on('error', done)
            .on('end', ping)
            .pipe(outputStream)
            .on('error', done)
            .on('data', (data) => console.log(data))
            .on('finish', done)
            .on('end', done)
    })

}

module.exports = parseAndInsert

    /*
    console.log(file);
    let count = 0
    try {
        // for testing, delete the contents of the database
        //await database('contracts').del()
        // parse the file
        let quoteDate = ""
        let stream = fs.createReadStream(file.path)
        .pipe(csv.parse({headers: true}))
        .transform(data => ({
            quote_date: data.quote_date,
            expiration: data.expiration,
            strike: +data.strike,
            option_type: data.option_type,
            open: +data.open,
            high: +data.high,
            low: +data.low,
            close: +data.close,
            trade_volume: +data.trade_volume,
            bid_size_1545: +data.bid_size_1545,
            bid_1545: +data.bid_1545,
            ask_size_1545: +data.ask_size_1545,
            ask_1545: +data.ask_1545,
            underlying_bid_1545: +data.underlying_bid_1545,
            underlying_ask_1545: +data.underlying_ask_1545,
            implied_underlying_price_1545: +data.implied_underlying_price_1545,
            active_underlying_price_1545: +data.active_underlying_price_1545,
            implied_volatility_1545: +data.implied_volatility_1545,
            delta_1545: +data.delta_1545,
            gamma_1545: +data.gamma_1545,
            theta_1545: +data.theta_1545,
            vega_1545: +data.vega_1545,
            rho_1545: +data.rho_1545,
            bid_size_eod: +data.bid_size_eod,
            bid_eod: +data.bid_eod,
            ask_size_eod: +data.ask_size_eod,
            ask_eod: +data.ask_eod,
            underlying_bid_eod: +data.underlying_bid_eod,
            underlying_ask_eod: +data.underlying_ask_eod,
            vwap: +data.vwap,
            open_interest: +data.open_interest,
            delivery_code: +data.delivery_code          
        }))
        .on("error", err => {
            console.log("csv parsing error")
            console.log(err)
            throw "csv parsing error"
            // close the file stream?
        })
        .on("data", async row => {
            // add row to database
            //database('contracts').insert(row)
            // remove a couple items from the row
            delete row.underlying_symbol
            delete row.root
            count++

            // this might take a while
            //await database('contracts').insert(row)

            if(count <  100) {
                //console.log('sample row')
                //console.log(row)
                quoteDate = row.quote_date
                await database('contracts').insert(row)
            }
        })
        .on("end", async rowCount => {
            console.log("finished parsing "+rowCount+" rows")
            let duration = Date.now() - startTime
            console.log("completed parse and insert at: "+duration);
                // save the file data to the db
            let totalRows = rowCount - 1
            await database('files').insert({
                date: quoteDate,
                file_name: file.path,
                file_size: file.size,
                rows: totalRows
            })
        })
        // SUCCESS!
        return true
    } catch(err) {
        console.log(err)
        throw "error uploading to database"
    }
    */
