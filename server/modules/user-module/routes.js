const express = require('express')
const UserController = require('./controller')
const userRouter = express.Router()

userRouter.post('/user/create', UserController.createUser)

module.exports = userRouter