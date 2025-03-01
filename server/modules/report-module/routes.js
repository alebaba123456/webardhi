const express = require('express')
const ReportController = require('./controller')
const reportRouter = express.Router()
const authorization = require('../../middlewares/admin-authorization')

reportRouter.get('/score-report/get', ReportController.getScoreReport)

module.exports = reportRouter