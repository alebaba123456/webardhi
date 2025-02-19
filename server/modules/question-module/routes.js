const express = require('express')
const QuestionController = require('./controller')
const QuestionRouter = express.Router()

QuestionRouter.get('/question', QuestionController.getQuestion)
QuestionRouter.post('/question', QuestionController.createQuestion)
QuestionRouter.put('/question', QuestionController.editQuestion)
QuestionRouter.delete('/question/:id', QuestionController.deleteQuestion)

module.exports = QuestionRouter