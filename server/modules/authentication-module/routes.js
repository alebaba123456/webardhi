const express = require('express')
const AuthenticationController = require('./controller')
const authenticationRouter = express.Router()

authenticationRouter.post('/login', AuthenticationController.login)

module.exports = authenticationRouter