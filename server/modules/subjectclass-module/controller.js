const { SubjectClass, Profile, Classroom, Subject } = require('../../models');
const validator = require('validator');

class SubjectClassController {
    static async getSubjectClass(req, res, next) {
        try {
            const allowedFields = ['ProfileId', 'ClassRoomId', 'SubjectId'];
            const extraFields = Object.keys(req.query).filter(key => !allowedFields.includes(key));

            if (extraFields.length > 0) {
                throw { name: 'InvalidQuery', message: `Invalid query fields: ${extraFields.join(', ')}` };
            }

            const { ProfileId, ClassRoomId, SubjectId } = req.query;
            const filters = {};

            if (ProfileId) {
                if (!validator.isInt(ProfileId, { min: 1 })) {
                    throw { name: 'Invalid input.' };
                }
                filters.ProfileId = parseInt(ProfileId);
            }

            if (ClassRoomId) {
                if (!validator.isInt(ClassRoomId, { min: 1 })) {
                    throw { name: 'Invalid input.' };
                }
                filters.ClassRoomId = parseInt(ClassRoomId);
            }

            if (SubjectId) {
                if (!validator.isInt(SubjectId, { min: 1 })) {
                    throw { name: 'Invalid input.' };
                }
                filters.SubjectId = parseInt(SubjectId);
            }

            const subjectClasses = await SubjectClass.findAll({
                where: filters,
                include: [
                    { model: Profile, attributes: ['id', 'name', 'role', 'gender'] },
                    { model: Classroom, attributes: ['id', 'grade', 'code'] },
                    { model: Subject, attributes: ['id', 'name', 'code'] }
                ]
            });

            res.status(200).json({
                message: 'SubjectClass data retrieved successfully.',
                data: subjectClasses
            });
        } catch (error) {
            next(error);
        }
    }

    static async createSubjectClass(req, res, next) {
        try {
            const { ProfileId, ClassRoomId, SubjectId } = req.body;

            if (!ProfileId || !ClassRoomId || !SubjectId) {
                throw { name: 'Invalid input.' };
            }

            if (!validator.isInt(ProfileId, { min: 1 }) ||
                !validator.isInt(ClassRoomId, { min: 1 }) ||
                !validator.isInt(SubjectId, { min: 1 })) {
                    throw { name: 'Invalid input.' };
            }

            const profile = await Profile.findByPk(ProfileId);
            const classroom = await Classroom.findByPk(ClassRoomId);
            const subject = await Subject.findByPk(SubjectId);

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
            const { id } = req.params;
            const { ProfileId, ClassRoomId, SubjectId } = req.body;

            if (!id || isNaN(parseInt(id))) {
                throw { name: 'Invalid input.' };
            }

            const subjectClass = await SubjectClass.findByPk(id);
            if (!subjectClass) {
                throw { name: 'Data not found.' };
            }

            const updates = {};

            if (ProfileId) {
                if (!validator.isInt(ProfileId, { min: 1 })) {
                    throw { name: 'Invalid input.' };
                }
                const profile = await Profile.findByPk(ProfileId);
                if (!profile) {
                    throw { name: 'Data not found.' };
                }
                updates.ProfileId = ProfileId;
            }

            if (ClassRoomId) {
                if (!validator.isInt(ClassRoomId, { min: 1 })) {
                    throw { name: 'Invalid input.' };
                }
                const classroom = await Classroom.findByPk(ClassRoomId);
                if (!classroom) {
                    throw { name: 'Data not found.' };
                }
                updates.ClassRoomId = ClassRoomId;
            }

            if (SubjectId) {
                if (!validator.isInt(SubjectId, { min: 1 })) {
                    throw { name: 'Invalid input.' };
                }
                const subject = await Subject.findByPk(SubjectId);
                if (!subject) {
                    throw { name: 'Data not found.' };
                }
                updates.SubjectId = SubjectId;
            }

            await subjectClass.update(updates);

            res.status(200).json({
                message: 'SubjectClass updated successfully.',
                data: subjectClass
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteSubjectClass(req, res, next) {
        try {
            const { id } = req.params;

            if (!id || isNaN(parseInt(id))) {
                throw { name: 'Invalid input.' };
            }

            const subjectClass = await SubjectClass.findByPk(id);
            if (!subjectClass) {
                throw { name: 'Data not found.' };
            }

            await subjectClass.destroy();

            res.status(200).json({
                message: 'SubjectClass deleted successfully.'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SubjectClassController;
