const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const { checkOverload } = require('./helpers/check.connect')
const router = require('./routes')

const { HttpStatusCodes, ErrorNames } = require("./constants")

const { NotFoundError }  = require('./core/error.response')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// init middleware
app.use(morgan('dev'))

app.use(helmet())

app.use(compression())

// init db
require('./dbs/mongodb')

//checkOverload()

// init routes
app.use('/', router)

app.use((req, res, next) => {
    const err = new NotFoundError(ErrorNames.NOT_FOUND, HttpStatusCodes.NOT_FOUND, 'API Endpoint Not Found');
    next(err)
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    return res.status(status).json({
        error_name: err.name,
        status: status,
        message: err.message
    })
})


// handling error


module.exports = app