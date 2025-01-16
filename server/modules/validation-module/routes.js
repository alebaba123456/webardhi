const express = require('express')
const ValidationController = require('./controller')
const validationRouter = express.Router()

validationRouter.get('/validate', ValidationController.validation)

module.exports = validationRouter