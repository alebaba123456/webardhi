const express = require('express');
const examinationSessionRouter = express.Router();
const ExaminationSessionController = require('./controller');
const studentAuthorization = require('../../middlewares/student-authorization')

examinationSessionRouter.post('/examination/start', ExaminationSessionController.startExamination);
examinationSessionRouter.put('/examination/save', ExaminationSessionController.saveExamination);
// examinationSessionRouter.put('/examination', ExaminationSessionController.editExamination);
// examinationSessionRouter.delete('/examination/:id', authorization, ExaminationSessionController.deleteExamination);

module.exports = examinationSessionRouter;