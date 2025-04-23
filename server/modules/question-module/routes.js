const express = require('express')
const QuestionController = require('./controller')
const upload = require('../../middlewares/upload-file')
const QuestionRouter = express.Router()

QuestionRouter.get('/question', QuestionController.getQuestion)
QuestionRouter.post('/question', upload.single('image'), QuestionController.createQuestion)
QuestionRouter.put('/question', upload.single('image'), QuestionController.editQuestion)
QuestionRouter.delete('/question/:id', QuestionController.deleteQuestion)

module.exports = QuestionRouter
