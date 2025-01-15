const express = require('express');
const UserController = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.post('/create', UserController.createUser);
userRouter.post('/change-password', UserController.changeUserPassword);
userRouter.post('/request-forget-password', UserController.requestForgetPassword);
userRouter.get('/confirm/:token', UserController.confirmForgetPassword);

module.exports = userRouter;
