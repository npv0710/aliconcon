const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 8800,
        checkingDurationSeconds: 5000
    },
    db: {
        mongoDbUri: process.env.DEV_MONGODB_URI || 'mongodb://localhost:27017/aliconcon',
    }
}

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 8800,
        checkingDurationSeconds: 5000
    },
    db: {
        mongoDbUri: process.env.PRO_MONGODB_URI || 'mongodb://localhost:27017/aliconcon',
    }
}

const config = { dev, pro }

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]