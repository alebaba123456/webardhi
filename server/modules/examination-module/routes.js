const express = require('express');
const examinationRouter = express.Router();
const ExaminationController = require('./controller');
const authorization = require('../../middlewares/admin-authorization')

examinationRouter.get('/examination', ExaminationController.getExamination);
examinationRouter.post('/examination', ExaminationController.createExamination);
examinationRouter.put('/examination', ExaminationController.editExamination);
examinationRouter.delete('/examination/:id', authorization, ExaminationController.deleteExamination);

module.exports = examinationRouter;