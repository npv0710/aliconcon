const mongoose = require('mongoose')

const config = require('../configs')

const os = require('os')

const process = require('process')

const CHECKING_SECONDS = config.app.checkingDurationSeconds

const countConnections = () => {
    const numberConnections = mongoose.connections.length
    console.log(`Number of connections: ${numberConnections}`);
    return numberConnections
}

const checkOverload = () => {
    setInterval(() => { 
        const numConnections = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        const maxConnections = numCores * 5
        console.log(`Active connections::${numConnections}`);
        console.log(`Memory usage::${memoryUsage / 1024 / 1024} MB`)
        if (numConnections > maxConnections) {
            console.log(`Connection overload detected`);
        }
    }, CHECKING_SECONDS)

}

module.exports = {
    countConnections,
    checkOverload
}

