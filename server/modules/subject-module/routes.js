const express = require('express')
const SubjectController = require('./controller')
const subjectRouter = express.Router()

subjectRouter.get('/subject/get', SubjectController.getSubject)
subjectRouter.post('/subject/create', SubjectController.createSubject)
subjectRouter.put('/subject/edit', SubjectController.editSubject)
subjectRouter.delete('/subject/delete', SubjectController.deleteSubject)

module.exports = subjectRouter