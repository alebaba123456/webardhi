const express = require('express');
const examinationSessionRouter = express.Router();
const ExaminationSessionController = require('./controller');

examinationSessionRouter.post('/examination/start', ExaminationSessionController.startExamination);
examinationSessionRouter.put('/examination/save', ExaminationSessionController.saveExamination);
examinationSessionRouter.get('/examination/submit', ExaminationSessionController.submitExamination);

module.exports = examinationSessionRouter;