const express = require('express')
const ProfileController = require('./controller')
const profileRouter = express.Router()
const authorization = require('../../middlewares/admin-authorization')

profileRouter.get('/profile/get', ProfileController.getProfile)
profileRouter.post('/profile/create', authorization, ProfileController.createProfile)
profileRouter.get('/profile/get/myprofile', ProfileController.getMyProfile)
profileRouter.put('/profile/edit', authorization, ProfileController.editProfile)
profileRouter.delete('/profile/delete/:id', authorization, ProfileController.deleteProfile)

module.exports = profileRouter