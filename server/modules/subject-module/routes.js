const express = require('express')
const SubjectController = require('./controller')
const subjectController = express.Router()

subjectController.get('/subject/get', SubjectController.getSubject)
subjectController.post('/subject/create', SubjectController.createSubject)
subjectController.put('/subject/edit', SubjectController.editSubject)
subjectController.delete('/subject/delete', SubjectController.deleteSubject)

module.exports = subjectRouter