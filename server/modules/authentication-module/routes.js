const express = require('express')
const AuthenticationController = require('./controller')
const authenticationRouter = express.Router()
const authentication = require('../../middlewares/authentication')

authenticationRouter.post('/login', AuthenticationController.login)
authenticationRouter.get('/logout',authentication, AuthenticationController.logout)
authenticationRouter.post('/user/request-forget-password', AuthenticationController.requestForgetPassword);
authenticationRouter.get('/user/confirm/:token', AuthenticationController.confirmForgetPassword);
authenticationRouter.get('/session/confirm/:token', AuthenticationController.resetSession)

module.exports = authenticationRouter