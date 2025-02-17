const express = require('express')
const QuestionController = require('./controller')
const QuestionRouter = express.Router()

// QuestionRouter.get('/question', QuestionController.getSubject)
QuestionRouter.post('/question', QuestionController.createQuestion)
// QuestionRouter.put('/question', QuestionController.editSubject)
// QuestionRouter.delete('/question/:id', QuestionController.deleteSubject)

module.exports = QuestionRouter