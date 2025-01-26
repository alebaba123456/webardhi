const { Classroom, Profile } = require('../../models')
const { textToLow } = require('../../helpers/loweringText')
const validator = require('validator');
const { Op } = require('sequelize')

class ClassController {
    static async getClassroom(req, res, next) {
        try {
            const allowedFields = ['page', 'size', 'keyword', 'category', 'order'];
    
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }
    
            const sanitizedPage = validator.toInt(req.query.page || 1);
            const sanitizedSize = validator.toInt(req.query.size || 10);
    
            const page = sanitizedPage > 0 ? sanitizedPage : 1;
            const size = sanitizedSize > 0 ? sanitizedSize : 10;
    
            const offset = (page - 1) * size;
            const limit = size;
            
            let whereClause = {};
            let orderClause = [];
    
            if (req.query.category) {
                const sanitizedCategory = validator.escape(req.query.category.toLowerCase() || "");
                if (!['grade', 'code'].includes(sanitizedCategory)) {
                    throw { name: 'Modified payload.' };
                }
    
                if (req.query.keyword) {
                    const sanitizedKeyword = validator.escape(req.query.keyword || "");
    
                    const [fieldType] = await Classroom.sequelize.query(`
                        SELECT data_type 
                        FROM information_schema.columns 
                        WHERE table_name = 'Classrooms' AND column_name = '${sanitizedCategory}'
                    `);
    
                    if (!fieldType || !fieldType.length) {
                        throw { name: 'Invalid category.' };
                    }
    
                    const isStringField = ['character varying', 'text'].includes(fieldType[0].data_type);
    
                    if (isStringField) {
                        whereClause[sanitizedCategory] = { [Op.iLike]: `%${sanitizedKeyword}%` };
                    } else if (fieldType[0].data_type === 'integer') {
                        const keywordAsInt = parseInt(sanitizedKeyword, 10);
                        if (isNaN(keywordAsInt)) {
                            throw { name: 'Invalid keyword for integer field.' };
                        }
                        whereClause[sanitizedCategory] = keywordAsInt;
                    } else {
                        throw { name: 'Unsupported field type.' };
                    }
                }
            }
    
            if (req.query.order) {
                const sanitizedOrder = validator.escape(req.query.order.toLowerCase() || "");
                if (!['asc', 'desc'].includes(sanitizedOrder)) {
                    throw { name: 'Modified payload.' };
                }
                orderClause.push(['id', sanitizedOrder]);
            }
    
            const classrooms = await Classroom.findAll({
                where: whereClause,
                order: orderClause,
                offset,
                limit,
            });
            
            const totalClassrooms = await Classroom.count({ where: whereClause });
            
            const result = await Promise.all(
                classrooms.map(async (classroom) => {
                    const profileCount = await Profile.count({
                        where: { ClassRoomId: classroom.id },
                    });
                    
                    return {
                        id: classroom.id,
                        grade: classroom.grade,
                        code: classroom.code,
                        profileCount,
                    };
                })
            );
            
            res.status(200).json({
                message: 'All classroom list.',
                data: result,
                totalData: Math.ceil(totalClassrooms / size),
            });
        } catch (error) {
            next(error);
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
            
            const sanitizedGrade = validator.toInt(grade || '')
            if (![0, 7, 8, 9].includes(sanitizedGrade)) {
                throw { name: 'Modified payload.' };
            }

            const sanitizedCode = validator.escape(code.toUpperCase() || '');
            if (!/^[A-Z]*$/.test(sanitizedCode)) {
                throw { name: 'Invalid code format.' };
            }

            if ((grade === 0 && code === 'guru') || (grade === 0 && code === 'admin')) {
                throw { name : 'Duplicated.'}
            }

            const existingClass = await Classroom.findOne({
                where: {
                    code,
                    grade
                }
            })

            if (existingClass) {
                throw { name : 'Duplicated.'}
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
            const sanitizedId = validator.isUUID(id || '');
            const sanitizedCode = (code || '').toUpperCase();
            const sanitizedGrade = validator.toInt(grade || '', 10);
            
            if (!/^[A-Z]*$/.test(sanitizedCode)) {
                throw { name: 'Invalid code format.' };
            }
            
            if (![7, 8, 9].includes(sanitizedGrade)) {
                throw { name: 'Modified payload.' };
            }
            
            const classroom = await Classroom.findOne({
                where: {
                    id : id
                }
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

            const extraFields = Object.keys(req.params).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload' };
            }
            
            const { id } = req.params;
            
            const sanitizedId = validator.isUUID(id || '');

            if (!sanitizedId) {
                throw { name: 'Modified payload.' };
            }

            const classroom = await Classroom.findOne({
                where: { 
                    id : id 
                }
            });
            
            if (classroom.id === 0) {
                throw { name: 'Forbidden.' };
            }

            if (!classroom) {
                throw { name: 'Data not found.' };
            }

            await classroom.destroy();

            res.status(200).json({
                message: 'Classroom deleted successfully.'
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = ClassController