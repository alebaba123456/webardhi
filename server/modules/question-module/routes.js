const express = require('express')
const QuestionController = require('./controller')
const QuestionRouter = express.Router()

// QuestionRouter.get('/question/get', QuestionController.getSubject)
QuestionRouter.post('/question/create', QuestionController.createQuestion)
// QuestionRouter.put('/question/edit', QuestionController.editSubject)
// QuestionRouter.delete('/question/delete/:id', QuestionController.deleteSubject)

module.exports = QuestionRouter