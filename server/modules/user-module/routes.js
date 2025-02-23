const express = require('express');
const UserController = require('../user-module/controller');
const authorization = require('../../middlewares/admin-authorization')
const authentication = require('../../middlewares/authentication')

const userRouter = express.Router();

userRouter.post('/user/create', authentication, authorization, UserController.createUser);
userRouter.post('/user/change-password', authentication, UserController.changeUserPassword);
userRouter.post('/user/request-forget-password', UserController.requestForgetPassword);
userRouter.get('/user/confirm/:token', UserController.confirmForgetPassword);

module.exports = userRouter;
