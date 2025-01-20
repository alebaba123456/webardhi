const { Profile, Classroom } = require('../../models');
const validator = require('validator');
const { Op } = require('sequelize')

class ProfileController {
    static async createProfile (req, res, next) {
        try {
            const allowedFields = [
                'name', 'birthDate', 'religion', 'gender', 'role', 'ClassRoomId'
            ];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { name, birthDate, religion, gender, role, ClassRoomId } = req.body;
            
            const sanitizedName = validator.escape(name || '');
            const sanitizedBirthDate = validator.toDate(birthDate) || null;
            const sanitizedReligion = validator.escape(religion.toLowerCase() || '');
            const sanitizedGender = validator.escape(gender || '');
            const sanitizedRole = validator.escape(role || '');
            let sanitizedClassRoomId = validator.escape(ClassRoomId || '');

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
                    id: sanitizedClassRoomId
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
                ClassRoomId: sanitizedClassRoomId
            });

            res.status(201).json({
                message: 'User profile created successfully.',
                profile,
            });
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }

    static async getProfile(req, res, next) {
        try {
            const allowedFields = ['name', 'religion', 'role', 'gender', 'grade', 'code'];
            const extraFields = Object.keys(req.query).filter(key => !allowedFields.includes(key));
    
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }
    
            const { name, religion, role, gender, grade, code } = req.query;
    
            const filters = {};
    
            if (name) {
                filters.name = {
                    [Op.iLike]: `%${name.trim()}%`
                };
            }
    
            if (religion) {
                const sanitizedReligion = validator.escape(religion.trim());
                filters.religion = sanitizedReligion.toUpperCase();
            }
    
            if (role) {
                const sanitizedRole = validator.escape(role.trim());
                filters.role = sanitizedRole.toUpperCase();
            }
    
            if (gender) {
                if (!['L', 'P'].includes(gender.toUpperCase())) {
                    throw { name: 'Invalid input.' };
                }
                filters.gender = gender.toUpperCase();
            }
    
            if (grade || code) {
                if (!grade || !code) {
                    throw { name: 'Invalid input.' };
                }
    
                const sanitizedGrade = validator.toInt(grade || '');
                const sanitizedCode = code.toUpperCase();
    
                if (![0, 7, 8, 9].includes(sanitizedGrade)) {
                    throw { name: 'Invalid input.' };
                }
    
                if (!/^[A-Z]*$/.test(sanitizedCode)) {
                    throw { name: 'Invalid input.' };
                }
    
                const classroom = await Classroom.findOne({
                    where: {
                        grade: sanitizedGrade,
                        code: sanitizedCode
                    }
                });
    
                if (!classroom) {
                    throw { name: 'Data not found.' };
                }
    
                filters.ClassRoomId = classroom.id;
            }
    
            const profiles = await Profile.findAll({
                where: filters,
                include: [
                    {
                        model: Classroom,
                        attributes: ['grade', 'code'],
                    }
                ]
            });
    
            res.status(200).json({
                message: 'Profiles retrieved successfully.',
                data: profiles
            });
        } catch (error) {
            next(error);
        }
    }
    
    static async editProfile(req, res, next) {
        try {
            const allowedFields = ['name', 'religion', 'role', 'gender', 'ClassRoomId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
    
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }
    
            const { id } = req.params;
            if (!id || isNaN(parseInt(id))) {
                throw { name: 'Invalid input.' };
            }
    
            const profile = await Profile.findByPk(id);
            if (!profile) {
                throw { name: 'Data not found.' };
            }
    
            const updates = {};
            const { name, religion, role, gender, ClassRoomId } = req.body;
    
            if (name) {
                updates.name = validator.escape(name.trim()).toUpperCase();
            }
    
            if (religion) {
                updates.religion = validator.escape(religion.trim()).toUpperCase();
            }
    
            if (role) {
                updates.role = validator.escape(role.trim()).toUpperCase();
            }
    
            if (gender) {
                if (!['L', 'P'].includes(gender.toUpperCase())) {
                    throw { name: 'Invalid input.' };
                }
                updates.gender = gender.toUpperCase();
            }
    
            if (ClassRoomId) {
                const classroom = await Classroom.findByPk(ClassRoomId);
                if (!classroom) {
                    throw { name: 'Data not found.' };
                }
                updates.ClassRoomId = ClassRoomId;
            }
    
            await profile.update(updates);
    
            res.status(200).json({
                message: 'Profile updated successfully.',
                data: profile
            });
        } catch (error) {
            next(error);
        }
    }
    
    static async deleteProfile(req, res, next) {
        try {
            const { id } = req.params;
            if (!id || isNaN(parseInt(id))) {
                throw { name: 'Invalid input.' };
            }
    
            const profile = await Profile.findByPk(id);
            if (!profile) {
                throw { name: 'Data not found.' };
            }
    
            await profile.destroy();
    
            res.status(200).json({
                message: 'Profile deleted successfully.'
            });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = ProfileController