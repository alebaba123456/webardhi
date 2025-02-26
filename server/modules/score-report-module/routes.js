const express = require('express');
const reportRouter = express.Router();
const ReportController = require('./controller');
const studentAuthorization = require('../../middlewares/student-authorization')

reportRouter.get('/my-report', ReportController.getReport);

module.exports = reportRouter;