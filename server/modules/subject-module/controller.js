const { Subject, SubjectClass, Classroom, Profile } = require('../../models');
const { Op } = require('sequelize')
const validator = require('validator');

class SubjectController {
    static async createSubject(req, res, next) {
        try {
            const allowedFields = ['name', 'grade', 'ProfileId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            let { name, grade, ProfileId } = req.body;

            const sanitizedName = validator.escape(name.toUpperCase() || "");
            
            if ([7, 8, 9].includes(grade)) {
                throw { name: 'Modified payload.' };
            }

            const isAnUUID = validator.isUUID(ProfileId)
            if (!isAnUUID) {
                throw { name: 'Modified payload.' };
            }

            const updatedName = sanitizedName.trim().toUpperCase();
            const words = updatedName.split(/\s+/);

            let baseCode;

            if (words.length >= 3) {
                baseCode = words[0][0] + words[1][0] + words[2][0];
            } else if (words.length === 2) {
                baseCode = words[0][0] + words[1][0] + (words[1][1] || words[0][1]);
            } else {
                baseCode = words[0].substring(0, 3);
            }

            baseCode = baseCode.toUpperCase();
            
            const code = `${baseCode}00${grade}`;

            const subject = await Subject.create({ 
                name : sanitizedName,
                code,
                grade,
                ProfileId 
            });

            const classrooms = await Classroom.findAll({
                where: {
                    grade
                }
            })

            if (classrooms.length === 0) {
                throw { name: 'No classrooms found for the given grade.' };
            }

            const subjectClasses = classrooms.map(classroom => ({
                SubjectId: subject.id,
                ClassRoomId: classroom.id
            }));

            await SubjectClass.bulkCreate(subjectClasses);

            res.status(201).json({
                message: 'Subject created successfully.'
            });
        } catch (error) {
            next(error);
        }
    }

    static async getSubject(req, res, next) {
        try {
            const allowedFields = ['page', 'size', 'keyword', 'category', 'order'];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            let offset = null;
            let limit = null;

            if (req.query.page && req.query.size) {
                const sanitizedPage = validator.toInt(req.query.page || 1);
                const sanitizedSize = validator.toInt(req.query.size || 10);

                const page = sanitizedPage > 0 ? sanitizedPage : 1;
                const size = sanitizedSize > 0 ? sanitizedSize : 10;

                offset = (page - 1) * size;
                limit = size;
            }

            let whereClause = {};
            let orderClause = [];

            if (req.query.category) {
                const sanitizedCategory = validator.escape(req.query.category.toLowerCase() || "");
                if (!['name', 'code', 'grade'].includes(sanitizedCategory)) {
                    throw { name: 'Modified payload.' };
                }

                if (req.query.keyword) {
                    const sanitizedKeyword = validator.escape(req.query.keyword || "");

                    const [fieldType] = await Subject.sequelize.query(`
                                    SELECT data_type 
                                    FROM information_schema.columns 
                                    WHERE table_name = 'Subjects' AND column_name = '${sanitizedCategory}'
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

            const subjects = await Subject.findAll({
                where: whereClause,
                order: orderClause,
                ...(offset !== null && limit !== null ? { offset, limit } : {}),
                include: [
                    { model: Profile, attributes: ['id', 'name'] },
                ]
            });

            const totalSubject = await Subject.count({
                where: whereClause
            });

            res.status(200).json({
                message: 'Subjects retrieved successfully.',
                data: subjects,
                totalData: Math.ceil(totalSubject / req.query.size),
            });
        } catch (error) {
            next(error);
        }
    }

    static async editSubject(req, res, next) {
        try {
            const allowedFields = ['id', 'name', 'grade', 'ProfileId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { id, name, grade, ProfileId } = req.body;
            
            const sanitizedName = validator.escape(name.toUpperCase() || "");

            const sanitizedId = validator.escape(id || "");
            if (!validator.isUUID(sanitizedId)) {
                throw { name: 'Modified payload.' };
            }

            const sanitizedProfileId = validator.escape(ProfileId || "");
            if (!validator.isUUID(sanitizedProfileId)) {
                throw { name: 'Modified payload.' };
            }

            const subject = await Subject.findOne({ where: { id: sanitizedId } });

            if (!subject) {
                throw { name: 'Data not found.' };
            }

            const updatedName = sanitizedName.trim().toUpperCase();
            const words = updatedName.split(/\s+/);

            let baseCode;

            if (words.length >= 3) {
                baseCode = words[0][0] + words[1][0] + words[2][0];
            } else if (words.length === 2) {
                baseCode = words[0][0] + words[1][0] + (words[1][1] || words[0][1]);
            } else {
                baseCode = words[0].substring(0, 3);
            }

            baseCode = baseCode.toUpperCase();
            
            const code = `${baseCode}00${grade}`;

            const isGradeChanged = subject.grade !== grade;

            await subject.update({
                name: sanitizedName,
                code,
                grade,
                ProfileId: sanitizedProfileId,
            });

            if (isGradeChanged) {
                await SubjectClass.destroy({ where: { SubjectId: sanitizedId } });
                const classrooms = await Classroom.findAll({
                    where: { grade }
                });

                if (classrooms.length === 0) {
                    throw { name: 'No classrooms found for the given grade.' };
                }

                const subjectClasses = classrooms.map(classroom => ({
                    SubjectId: sanitizedId,
                    ClassRoomId: classroom.id
                }));

                await SubjectClass.bulkCreate(subjectClasses);
            }

            res.status(200).json({
                message: 'Subject updated successfully.',
                subject
            });
        } catch (error) {
            next(error);
        }
    }


    static async deleteSubject(req, res, next) {
        try {
            const allowedFields = ['id'];
            const extraFields = Object.keys(req.params).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { id } = req.params;
            const sanitizedId = validator.escape(id || "")
            const isAnUUID = validator.isUUID(sanitizedId);
            if (!isAnUUID) {
                throw { name: 'Modified payload.' };
            }

            const subject = await Subject.findOne({ where: { id: sanitizedId } });
            if (!subject) {
                throw { name: 'Data not found.' };
            }

            await subject.destroy();

            res.status(200).json({
                message: 'Subject deleted successfully.'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SubjectController;
