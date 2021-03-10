
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, './uploads')
    // },
    destination: "./uploadss",
    filename: (req, file, cb) => {
        console.log("file information in STORAGE")
        console.log(file);
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

const uploader = app.post('/api/v1/upload', upload.single('file'), async (req, res, next) => {
    console.log("Heres the request: ")

    // look up how controller works 
    // look up how router works
    // try { ContractModel.parseAndInsert(file) } catch(err) {}

    // don't let someone upload the same file that has already been uploaded

    // now wait for the parse and 
    /*
    try{
        await service.parseAndInsert(req.file.path)
        return res.status(200).json({"success"})
    } catch (error) {
        next(error)
    }
    */
    // await parseAndInsert(req)

    console.log(req.file);
    let count = 0
    try {
        // for testing, delete the contents of the database
        //await database('contracts').del()
        // parse the file
        let quoteDate = ""
        let stream = fs.createReadStream(req.file.path)
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
            // close the file stream?
        })
        .on("data", async row => {
            // add row to database
            //database('contracts').insert(row)
            // remove a couple items from the row
            delete row.underlying_symbol
            delete row.root
            count++

            if(count == 4) {
                console.log('sample row')
                console.log(row)
                quoteDate = row.quote_date
                await database('contracts').insert(row)
            }
        })
        .on("end", async rowCount => {
            console.log("finished parsing "+rowCount+" rows")
            // save the file to the db
            let totalRows = rowCount - 1
            await database('files').insert({
                date: quoteDate,
                file_name: req.file.path,
                file_size: req.file.size,
                rows: totalRows
            })
        })


        return res.status(201).json({
             message: "file successfully uploaded"
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({err})
    }
    // parse the req
    // add data to the contracts db
    // update the files database
})


const uploader = async (req, res, next) => {
    // if successful 
    // next()

    // else
    // res.status(500).send('error')
    next()
}

module.exports = uploader