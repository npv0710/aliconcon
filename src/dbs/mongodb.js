'use strict'
const mongoose = require('mongoose')
const config = require('../configs')

const { countConnections } = require('../helpers/check.connect')

class MongoDb {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.set('debug', true)
        mongoose.set('debug', { color: true })

        mongoose.connect(config.db.mongoDbUri)
        .then(() => {
            console.log('Connected MongoDb Success')
            countConnections()
        })
        .catch(err => console.log('Connect Db Error!', err))
    }

    static getInstance() {
        if (!MongoDb.instance) {
            MongoDb.instance = new MongoDb()
        }

        return MongoDb.instance
    }
}

const mongoDbInstance = MongoDb.getInstance()

module.exports = mongoDbInstance


