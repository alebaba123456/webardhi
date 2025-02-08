const express = require('express');
const examinationRouter = express.Router();
const ExaminationController = require('./controller');

examinationRouter.get('/examination', ExaminationController.getExamination);
// examinationRouter.post('/examination', ExaminationController.createSubjectClass);
// examinationRouter.put('/examination', ExaminationController.editSubjectClass);
// examinationRouter.delete('/examination/:id', ExaminationController.deleteSubjectClass);

module.exports = examinationRouter;