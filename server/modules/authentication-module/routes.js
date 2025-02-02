const express = require('express')
const AuthenticationController = require('./controller')
const authenticationRouter = express.Router()
const authentication = require('../../middlewares/authentication')

authenticationRouter.post('/login', AuthenticationController.login)
authenticationRouter.get('/logout',authentication, AuthenticationController.logout)

module.exports = authenticationRouter