'use strict'

const HttpStatusCodes = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400
}

const ErrorMessage = {
    FORBIDDEN: 'Forbidden',
    CONFLICT: 'Conflict',
    NOT_FOUND: 'Not Found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    BAD_REQUEST: 'Bad request'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ErrorMessage.BAD_REQUEST, status = HttpStatusCodes.BAD_REQUEST) {
        super(message, status)
    }
}

module.exports = {
    BadRequestError
}







