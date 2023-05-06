'use strict'

const AccessService = require("../services/access.service");

class AccessController {
    signup = async (req, res, next) => {
        try {
            console.log('API signup::', req.body);

            const userTokens = await AccessService.signup(req.body)

            return res.status(201).json(userTokens)
        }catch (err) {
            next(err)
        }
    }
}

module.exports = new AccessController()