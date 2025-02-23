const express = require('express')
const ClassController = require('./controller')
const classroomRouter = express.Router()
const authorization = require('../../middlewares/admin-authorization')

classroomRouter.get('/classroom/get', ClassController.getClassroom)
classroomRouter.post('/classroom/create', authorization, ClassController.createClassroom)
classroomRouter.put('/classroom/edit',authorization, ClassController.editClassroom)
classroomRouter.delete('/classroom/delete/:id',authorization, ClassController.deleteClassroom)

module.exports = classroomRouter