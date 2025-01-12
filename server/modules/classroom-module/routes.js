const express = require('express')
const ClassController = require('./controller')
const classroomRouter = express.Router()

classroomRouter.get('/classroom/get', ClassController.getClassroom)
classroomRouter.post('/classroom/create', ClassController.createClassroom)
classroomRouter.put('/classroom/edit', ClassController.editClassroom)
classroomRouter.delete('/classroom/delete', ClassController.deleteClassroom)

module.exports = classroomRouter