const userRole = {
    USER: 'USER',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN'
}

const HttpStatusCodes = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    OK: 200,
    CREATED: 201,
    UNAUTHORIZED: 401
}

const ErrorNames = {
    FORBIDDEN: 'Forbidden',
    CONFLICT: 'Conflict',
    NOT_FOUND: 'Not Found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Unauthorized'
}

const SuccessResponseCode = {
    CREATED: 'Created',
    OK: 'Success'
}

module.exports = {
    userRole,
    HttpStatusCodes,
    ErrorNames,
    SuccessResponseCode
}
