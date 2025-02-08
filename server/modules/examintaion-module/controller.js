const { Op } = require('sequelize');
const { SubjectClass, Examination, Classroom, Subject, Profile } = require('../../models');
const validator = require('validator');

class ExaminationController {
    static async getExamination(req, res, next) {
        try {
            const allowedFields = ['page', 'size', 'keyword', 'category', 'order'];
            const extraFields = Object.keys(req.query).filter(key => !allowedFields.includes(key));

            if (extraFields.length > 0) {
                throw { name: 'InvalidQuery', message: `Invalid query fields: ${extraFields.join(', ')}` };
            }

            const sanitizedSize = validator.toInt(req.query.size || 0);
            const sanitizedPage = validator.toInt(req.query.page || 1);

            let offset = null;
            let limit = null;

            offset = (sanitizedPage - 1) * sanitizedSize;
            limit = sanitizedSize;

            let whereClause = {};
            let orderClause = [];

            if (req.query.category) {
                const sanitizedCategory = validator.escape(req.query.category || "");

                if (!['ProfileId', 'ClassRoomId', 'SubjectId'].includes(sanitizedCategory)) {
                    throw { name: 'Modified payload.' };
                }

                if (req.query.keyword) {
                    const sanitizedKeyword = validator.escape(req.query.keyword || "");

                    const [fieldType] = await Subject.sequelize.query(`
                                                SELECT data_type 
                                                FROM information_schema.columns 
                                                WHERE table_name = 'SubjectClasses' AND column_name = '${sanitizedCategory}'
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
                    } else if (fieldType[0].data_type === 'uuid') {
                        if (!validator.isUUID(sanitizedKeyword)) {
                            throw { name: 'Modified payload.' };
                        }
                        whereClause[sanitizedCategory] = sanitizedKeyword;
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

            const examination = await Examination.findAll({
                where: whereClause,
                order: orderClause,
                ...(offset !== null && limit !== null ? { offset, limit } : {}),
                include: [
                    { 
                        model: SubjectClass,
                        include: [
                            {
                                model: Subject,
                                attributes: ['name']
                            },
                            {
                                model: Classroom,
                                attributes: ['grade', 'code']
                            },
                        ]
                    }
                ]
            });            

            const totalExamination = await Examination.count({
                where: whereClause
            });

            res.status(200).json({
                message: 'SubjectClass data retrieved successfully.',
                data: examination,
                totalData: Math.ceil(totalExamination / sanitizedSize),
            });
        } catch (error) {
            next(error);
        }
    }

    static async createExamination(req, res, next) {
        try {
            const allowedFields = ['SubjectClassId', 'type'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { SubjectClassId, type } = req.body;

            if (!SubjectClassId || !type) {
                throw { name: 'Invalid input.' };
            }

            if (!validator.isUUID(SubjectClassId)) {
                throw { name: 'Modified payload.' };
            }

            const subjectClass = await SubjectClass.findOne({
                where: {
                    id: SubjectClassId,
                }
            });

            if (!subjectClass) {
                throw { name: 'Data not found.' };
            }

            await Examination.create({
                SubjectClassId,

            });

            res.status(201).json({
                message: 'SubjectClass created successfully.',
            });
        } catch (error) {
            next(error);
        }
    }

    static async editSubjectClass(req, res, next) {
        try {
            const allowedFields = ['id', 'ProfileId', 'SubjectId', 'ClassRoomId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { id, ProfileId, SubjectId, ClassRoomId } = req.body;

            const sanitizedId = validator.escape(id || "");
            const sanitizedProfileId = validator.escape(ProfileId || "");
            const sanitizedSubjectId = validator.escape(SubjectId || "");
            const sanitizedClassroomId = validator.escape(ClassRoomId || "");

            const isAnUUID = validator.isUUID(sanitizedId);
            const isProfileIdAnUUID = validator.isUUID(sanitizedProfileId);
            const isSubjectIdAnUUID = validator.isUUID(sanitizedSubjectId);
            const isClassRoomIdAnUUID = validator.isUUID(sanitizedClassroomId);

            if (!isAnUUID || !isProfileIdAnUUID || !isSubjectIdAnUUID || !isClassRoomIdAnUUID) {
                throw { name: 'Modified payload.' };
            }

            const subjectClass = await SubjectClass.findOne({ where: { id: sanitizedId } });

            if (!subjectClass) {
                throw { name: 'Data not found.' };
            }

            await subjectClass.update({
                ProfileId: sanitizedProfileId,
                ClassRoomId: sanitizedClassroomId,
                SubjectId: sanitizedSubjectId,
            });

            res.status(200).json({
                message: 'Subject updated successfully.',
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteSubjectClass(req, res, next) {
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

            const subjectClass = await SubjectClass.findOne({ where: { id: sanitizedId } });
            if (!subjectClass) {
                throw { name: 'Data not found.' };
            }

            await subjectClass.destroy();

            res.status(200).json({
                message: 'Subject deleted successfully.'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ExaminationController;
