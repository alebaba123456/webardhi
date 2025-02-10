const { Op } = require('sequelize');
const { SubjectClass, Profile, Classroom, Subject } = require('../../models');
const validator = require('validator');

class SubjectClassController {
    static async getSubjectClass(req, res, next) {
        try {
            const allowedFields = ['page', 'size', 'keyword', 'category', 'order'];
            const extraFields = Object.keys(req.query).filter(key => !allowedFields.includes(key));

            if (extraFields.length > 0) {
                throw { name: 'InvalidQuery', message: `Invalid query fields: ${extraFields.join(', ')}` };
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

            const subjectClasses = await SubjectClass.findAll({
                where: whereClause,
                order: orderClause,
                ...(offset !== null && limit !== null ? { offset, limit } : {}),
                include: [
                    { model: Profile, attributes: ['id', 'name'] },
                    { model: Classroom, attributes: ['id', 'grade', 'code'] },
                    { model: Subject, attributes: ['id', 'name', 'code'] }
                ]
            });

            const totalSubjectClass = await SubjectClass.count({
                where: whereClause
            });

            res.status(200).json({
                message: 'SubjectClass data retrieved successfully.',
                data: subjectClasses,
                totalData: Math.ceil(totalSubjectClass / limit),
            });
        } catch (error) {
            console.log(error);

            next(error);
        }
    }

    static async createSubjectClass(req, res, next) {
        try {
            const allowedFields = ['ProfileId', 'ClassRoomId', 'SubjectId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { ProfileId, ClassRoomId, SubjectId } = req.body;

            if (!ProfileId || !ClassRoomId || !SubjectId) {
                throw { name: 'Invalid input.' };
            }

            if (!validator.isUUID(ProfileId) ||
                !validator.isUUID(ClassRoomId) ||
                !validator.isUUID(SubjectId)) {
                throw { name: 'Modified payload.' };
            }

            const profile = await Profile.findOne({
                where: {
                    id: ProfileId,
                    role: 'GURU'
                }
            });
            const classroom = await Classroom.findOne({
                where: {
                    id: ClassRoomId,
                    grade: {
                        [Op.ne]: 0
                    }
                }
            });
            const subject = await Subject.findOne({
                where: {
                    id: SubjectId
                }
            });

            if (!profile || !classroom || !subject) {
                throw { name: 'Data not found.' };
            }

            const newSubjectClass = await SubjectClass.create({
                ProfileId,
                ClassRoomId,
                SubjectId
            });

            res.status(201).json({
                message: 'SubjectClass created successfully.',
                data: newSubjectClass
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

module.exports = SubjectClassController;
