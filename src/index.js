require('dotenv').config()
const express = require('express')
const cors = require('cors')
const auth = require('./middleware/auth')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(auth)
app.use('/api/v1', [
    require('./api/routes/files'),
    require('./api/routes/trades'),
    require('./api/routes/historical')
])

app.use((error, req, res, next) => {
    // handle logging and errors here
    console.log('I am the error handling middleware')
    console.log(error)
    res.status(500).send(error.message)
})

const port = process.env.PORT

const startup = async () => {
    // add our database connection to app.locals

    app.listen(port, () => {
        console.info(`Server is listening on port ${port}.`)
    })  
}

startup()



/*
app.get('/api/v1/files', async(req, res) => {
    // return a json array of objects with dates and filenames and file data (size, number of rows)
    try {
        let files = await database('files').select()
        res.status(200).json(files)
    } catch (err) {
        res.status(500).json({err})
    }
})
*/
/*
app.get('/api/v1/trades', async(req, res) => {
    try {
        let trades = await database('option_trades').select()
        res.status(200).json(trades)
    } catch (err) {
        res.status(500).json({err})
    }
})
*/
/*
app.post('/api/v1/trades', async(req, res) => {
    try {
        const {trade} = req.body
        await database("option_trade").insert(trade).then(result => {
            console.log("inserted trade");
            return res.status(200).json(result)
        })
    } catch (err) {
        res.status(500).json({err})
    }

    const { task } = req.body;
    const newTodo = await db("todo")
      .insert(task)
      .then(item => {
        return item.rowCount;
      });
      
    if (newTodo === 1) {
      return res.status(201).json({ message: "Todo created successfully" });
    }
  
})
*/
/*
app.post('/api/v1/upload', upload.single('file'), async (req, res, next) => {
    console.log("Heres the request: ")

    // look up how controller works 
    // look up how router works
    // try { ContractModel.parseAndInsert(file) } catch(err) {}

    // don't let someone upload the same file that has already been uploaded

    console.log(req.file);
    let count = 0
    try {
        // for testing, delete the contents of the database
        //await database('contracts').del()
        // try to access database
        console.log("getting filelist");
        let filelist = await database('files')
        console.log(filelist);
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
*/
