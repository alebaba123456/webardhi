const express = require('express')
const ProfileController = require('./controller')
const profileRouter = express.Router()

profileRouter.post('/profile/create', ProfileController.createProfile)
profileRouter.get('/profile/get', ProfileController.getProfile)
profileRouter.get('/profile/get/myprofile', ProfileController.getMyProfile)
profileRouter.put('/profile/edit', ProfileController.editProfile)
profileRouter.delete('/profile/delete/:id', ProfileController.deleteProfile)

module.exports = profileRouter