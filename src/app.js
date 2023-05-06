const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const { checkOverload } = require('./helpers/check.connect')
const router = require('./routes')

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

// handling error


module.exports = app