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
