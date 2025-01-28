const express = require('express')
const ProfileController = require('./controller')
const profileRouter = express.Router()

profileRouter.post('/profile/create', ProfileController.createProfile)
profileRouter.get('/profile/get', ProfileController.getProfile)
profileRouter.put('/profile/edit', ProfileController.editProfile)
profileRouter.delete('/profile/delete/:id', ProfileController.deleteProfile)

module.exports = profileRouter