const express = require('express')
const RouterController = require('./controller')
const routerRouter = express.Router()

routerRouter.get('/router/get', RouterController.getRouter)

module.exports = routerRouter