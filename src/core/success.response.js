'use strict'

const { HttpStatusCodes, SuccessResponseCode } = require('../constants/index')


class SuccessResponse {
    constructor({ 
        message, 
        statusCode = HttpStatusCodes.OK,
        successResponseCode = SuccessResponseCode.OK,
        metaData = {}
    }) {
        this.message = message
        this.status = statusCode
        this.metaData = metaData
    }

    send (res, headers = {}) {
        return res.status(statusCode).json(this)
    }
}

class OKResponse extends SuccessResponse{
    constructor({ message, metaData }) {
        super({ message, metaData })
    }
}

class CreatedResponse extends SuccessResponse {
    constructor({ message, 
        statusCode = HttpStatusCodes.CREATED,
        successResponseCode = SuccessResponseCode.CREATED,
        metaData
    }) {
        super({ message, statusCode, successResponseCode, metaData, options })
        this.options = this.options
    }
}

module.exports = {
    OKResponse,
    CreatedResponse
}