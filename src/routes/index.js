const express = require('express')

const router = express.Router()

const accRouter = require('./access')

router.use('/api/v1', accRouter)

router.get('', (req, res, next)  => {
    const strCompress = 'Hello Guest'

    return res.status(200).json({
        message: 'Welcome Aliconcon Ecommerce',
        //metaData: strCompress.repeat(1000000) 
    })
})

module.exports = router