const { Profile, Classroom } = require('../../models');
const validator = require('validator');

class ProfileController {
    static async createProfile (req, res, next) {
        try {
            const allowedFields = [
                'name', 'birthDate', 'religion', 'gender', 'role', 'classroomId'
            ];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { name, birthDate, religion, gender, role, classroomId } = req.body;
            
            const sanitizedName = validator.escape(name.toUpperCase() || '');
            const sanitizedBirthDate = validator.toDate(birthDate) || null;
            const sanitizedReligion = validator.escape(religion || '');
            const sanitizedGender = validator.escape(gender || '');
            const sanitizedRole = validator.escape(role || '');
            let sanitizedClassroomId = validator.toInt(classroomId || 0);

            if (!['islam', 'kristen', 'katolik', 'hindu', 'budha', 'konghucu', 'lainnya'].includes(sanitizedReligion)) {
                throw { name: 'Invalid input.' };
            }

            if (!['L', 'P'].includes(sanitizedGender)) {
                throw { name: 'Invalid input.' };
            }

            if (!['siswa', 'guru', 'admin'].includes(sanitizedRole)) {
                throw { name: 'Invalid input.' };
            }

            const classroom = await Classroom.findOne({
                where: {
                    id: sanitizedClassroomId
                }
            })
            if (!classroom) {
                throw { name: 'Data not found.' };
            }

            const profile = await Profile.create({
                name: sanitizedName.toUpperCase(),
                birthDate: sanitizedBirthDate,
                religion: sanitizedReligion.toUpperCase(),
                gender: sanitizedGender.toUpperCase(),
                role: sanitizedRole.toUpperCase(),
                ClassRoomId: sanitizedClassroomId
            });

            res.status(201).json({
                message: 'User profile created successfully.',
                profile,
            });
        } catch (error) {
            next(error)
        }
    }

    static async getProfile (req, res, next) {
        try {
            const allowedFields = [
                'grade', 'code',
            ];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { grade, code } = req.query;

        } catch (error) {
            
        }
    }
}

module.exports = ProfileController