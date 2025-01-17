const express = require('express')
const AuthenticationController = require('./controller')
const authenticationRouter = express.Router()

authenticationRouter.post('/login', AuthenticationController.login)
authenticationRouter.get('/logout', AuthenticationController.logout)

module.exports = authenticationRouter