const express = require('express');
const UserController = require('../user-module/controller');

const userRouter = express.Router();

userRouter.post('/user/create', UserController.createUser);
userRouter.post('/user/change-password', UserController.changeUserPassword);
userRouter.post('/user/request-forget-password', UserController.requestForgetPassword);
userRouter.get('/user/confirm/:token', UserController.confirmForgetPassword);

module.exports = userRouter;
