const express = require('express');
const classSubjectRouter = express.Router();
const SubjectClassController = require('./controller');

classSubjectRouter.get('/subject-classes', SubjectClassController.getSubjectClass);
classSubjectRouter.post('/subject-classes', SubjectClassController.createSubjectClass);
classSubjectRouter.put('/subject-classes/:id', SubjectClassController.editSubjectClass);
classSubjectRouter.delete('/subject-classes/:id', SubjectClassController.deleteSubjectClass);

module.exports = classSubjectRouter;
