const express = require('express')
const ProfileController = require('./controller')
const profileRouter = express.Router()

profileRouter.post('/profile/create', ProfileController.createProfile)
// profileRouter.get('/profile/get')

module.exports = profileRouter