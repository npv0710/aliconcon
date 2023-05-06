'use strict'

const express = require('express')
const accRouter = express.Router()
const accessController = require('../../controllers/access.controller')

accRouter.post('/user/signup', accessController.signup)

module.exports = accRouter

