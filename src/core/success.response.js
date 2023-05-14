'use strict'

const { HttpStatusCodes, SuccessResponseCode } = require('../constants/index')


class SuccessResponse {
    constructor({ 
        message, 
        statusCode = HttpStatusCodes.OK,
        successResponseCode = SuccessResponseCode.OK,
        metaData = {}
    }) {
        this.message = message ? message : successResponseCode
        this.status = statusCode
        this.metaData = metaData
    }

    send (res, headers = {}) {
        return res.status(this.status).json(this)
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
        metaData,
        options = {}
    }) {
        super({ message, statusCode, successResponseCode, metaData })
        this.options = options
    }
}

class SigninedResponse extends SuccessResponse {
    constructor({ message, 
        statusCode = HttpStatusCodes.OK,
        successResponseCode = SuccessResponseCode.OK,
        metaData,
        options = {}
    }) {
        super({ message, statusCode, successResponseCode, metaData })
        this.options = options
    }
}

module.exports = {
    OKResponse,
    CreatedResponse,
    SigninedResponse
}