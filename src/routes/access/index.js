'use strict'

const express = require('express')
const accRouter = express.Router()
const accessController = require('../../controllers/access.controller')
const { handlerError } = require('../../middleware/handleerror/handler.error')

accRouter.post('/user/signup', handlerError(accessController.signup))
accRouter.post('/user/signin', handlerError(accessController.signin))

module.exports = accRouter

