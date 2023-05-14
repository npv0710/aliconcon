'use strict'

const AccessService = require("../services/access.service")
const { CreatedResponse, SigninedResponse } = require('../core/success.response')
const { HttpStatusCodes } = require('../constants/index')

class AccessController {
    signup = async (req, res, next) => {
        new CreatedResponse({ 
            message: 'User Created!',
            statusCode: HttpStatusCodes.CREATED,
            metaData: await AccessService.signup(req.body),
            options: {
                limit: 10
            }
        }).send(res)
    }

    signin = async (req, res, next) => {
        new SigninedResponse({
            message: 'User Logged-in!',
            statusCode: HttpStatusCodes.OK,
            metaData: await AccessService.signin(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()