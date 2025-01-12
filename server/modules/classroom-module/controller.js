const { Classroom } = require('../../models')
const { textToLow } = require('../../helpers/loweringText')
const validator = require('validator');

class ClassController {
    static async getClassroom (req, res, next) {
        try {
            const sanitizedGrade = validator.toInt(req.query.grade || '', 10)
            if (![7, 8, 9].includes(sanitizedGrade) && sanitizedGrade.length !== 0) {
                throw { name: 'Invalid grade value.' };
            }

            let classroom

            if (req.query.grade) {
                classroom = await Classroom.findAll({
                    where: {
                        grade : sanitizedGrade
                    }
                })
            } else {
                classroom = await Classroom.findAll()
            }
            
            res.status(200).json({
                message: 'All classroom list.',
                data: classroom
            })
        } catch (error) {
            next(error)
        }
    }

    static async createClassroom (req, res, next) {
        try {
            const allowedFields = ['grade', 'code'];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.', extraFields };
            }

            const { grade, code } = req.body

            const sanitizedGrade = validator.escape(textToLow(grade || ''))
            if (!['7', '8', '9'].includes(sanitizedGrade)) {
                throw { name: 'Invalid grade value.' };
            }

            const sanitizedCode = (code || '').toUpperCase();
            if (!/^[A-Z]*$/.test(sanitizedCode)) {
                throw { name: 'Invalid code format.' };
            }

            const createdClass = await Classroom.create({
                grade : sanitizedGrade,
                code : sanitizedCode
            })

            res.status(201).json({
                message: 'Class created successfully.',
                createdClass
            });
        } catch (error) {
            next(error)
        }
    }

    static async editClassroom (req, res, next) {
        try {
            const allowedFields = ['id', 'code', 'grade'];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { id, code, grade } = req.body
            const sanitizedId = validator.toInt(id || '', 10);
            const sanitizedCode = (code || '').toUpperCase();
            const sanitizedGrade = validator.toInt(grade || '', 10);

            if (!/^[A-Z]*$/.test(sanitizedCode)) {
                throw { name: 'Invalid code format.' };
            }

            if (![7, 8, 9].includes(sanitizedGrade)) {
                throw { name: 'Invalid grade value.' };
            }

            const classroom = await Classroom.findOne({
                where: { id: sanitizedId }
            });

            if (!classroom) {
                throw { name: 'Data not found.' };
            }

            await classroom.update({
                code: sanitizedCode,
                grade: sanitizedGrade
            });

            res.status(200).json({
                message: 'Classroom updated successfully.',
                classroom
            });
        } catch (error) {
            next(error)
        }
    }

    static async deleteClassroom(req, res, next) {
        try {
            const allowedFields = ['id'];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload' };
            }

            const { id } = req.body;

            const sanitizedId = validator.toInt(id || '', 10);

            if (!sanitizedId) {
                throw { name: 'Data not found.' };
            }

            const classroom = await Classroom.findOne({
                where: { id: sanitizedId }
            });

            if (!classroom) {
                throw { name: 'Data not found.' };
            }

            await classroom.destroy();

            res.status(200).json({
                message: 'Classroom deleted successfully.'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ClassController