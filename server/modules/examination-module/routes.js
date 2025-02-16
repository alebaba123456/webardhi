const express = require('express');
const examinationRouter = express.Router();
const ExaminationController = require('./controller');

examinationRouter.get('/examination', ExaminationController.getExamination);
examinationRouter.post('/examination', ExaminationController.createExamination);
examinationRouter.put('/examination', ExaminationController.editExamination);
examinationRouter.delete('/examination/:id', ExaminationController.deleteExamination);

module.exports = examinationRouter;