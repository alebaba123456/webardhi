const { Profile, Classroom, User } = require('../../models');
const validator = require('validator');
const { Op } = require('sequelize')

class ProfileController {
    static async createProfile(req, res, next) {
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
            const sanitizedRole = validator.escape(role.toLowerCase() || '');
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
            next(error)
        }
    }

    static async getProfile(req, res, next) {
        try {
            const allowedFields = ['page', 'size', 'keyword', 'category', 'order', 'role'];
            const extraFields = Object.keys(req.query).filter(key => !allowedFields.includes(key));

            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }
            
            let sanitizedPage
            let sanitizedSize
            if (req.query.page) {
                sanitizedPage = validator.toInt(req.query.page);
            }
            console.log(req.query, 'IAM HEREEEEEEE');
            if (req.query.size) {
                sanitizedSize = validator.toInt(req.query.size || 10);
            }
            
            const page = sanitizedPage > 0 ? sanitizedPage : 1;
            const size = sanitizedSize > 0 ? sanitizedSize : 10;
            
            const offset = (page - 1) * size;
            const limit = size;
            
            let whereClause = {};
            let orderClause = [];
            
            const sanitizedRole = validator.escape(req.query.role?.toUpperCase() || "");
            
            if (sanitizedRole) {
                whereClause.role = sanitizedRole;
            }
            
            if (req.query.category) {
                const sanitizedCategory = validator.escape(req.query.category || "");
                if (!['name', 'religion', 'gender', 'ClassRoomId', 'role'].includes(sanitizedCategory)) {
                    throw { name: 'Modified payload.' };
                }
                
                if (req.query.keyword) {
                    const sanitizedKeyword = validator.escape(req.query.keyword || "");
                    
                    const [fieldType] = await Profile.sequelize.query(`
                        SELECT data_type 
                        FROM information_schema.columns 
                        WHERE table_name = 'Profiles' AND column_name = '${sanitizedCategory}'
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
                            throw { name: 'Modified payload.' };
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

            const profiles = await Profile.findAll({
                where: whereClause,
                order: orderClause,
                ...(offset !== null && limit !== null ? { offset, limit } : {}),
                include: [
                    {
                        model: Classroom,
                    },
                    {
                        model: User,
                        attributes: ['email'],
                        required: false
                    }
                ]
            });

            const totalProfiles = await Profile.count({
                where: whereClause
            });

            res.status(200).json({
                message: 'Profiles retrieved successfully.',
                data: profiles,
                totalData: Math.ceil(totalProfiles / size),
            });
        } catch (error) {
            console.log(error);
            
            next(error);
        }
    }

    static async editProfile(req, res, next) {
        try {
            const allowedFields = ['id', 'name', 'birthDate', 'religion', 'role', 'gender', 'ClassRoomId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));

            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { id } = req.body;

            if (!validator.isUUID(id || '')) {
                throw { name: 'Modified payload.' };
            }

            const profile = await Profile.findByPk(id);
            if (!profile) {
                throw { name: 'Data not found.' };
            }

            const updates = {};
            const { name, religion, birthDate, role, gender, ClassRoomId } = req.body;

            if (name) {
                updates.name = validator.escape(name.trim()).toUpperCase();
            }

            if (religion) {
                if (!['islam', 'kristen', 'katolik', 'hindu', 'budha', 'khonghucu', 'lainnya'].includes(religion.toLowerCase())) {
                    throw { name: 'Modified payload.' };
                }
                updates.religion = validator.escape(religion.trim().toUpperCase() || "");
            }

            if (role) {
                if (!['siswa', 'guru', 'admin'].includes(role.toLowerCase())) {
                    throw { name: 'Modified payload.' };
                }
                updates.role = validator.escape(role.trim().toUpperCase() || "");
            }

            if (birthDate) {
                updates.birthDate = validator.toDate(birthDate) || null;
            }

            if (gender) {
                if (!['L', 'P'].includes(gender.toUpperCase())) {
                    throw { name: 'Modified payload.' };
                }
                updates.gender = gender.toUpperCase() || null;
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

            const profile = await Profile.findByPk(id);
            if (!profile) {
                throw { name: 'Data not found.' };
            }

            if (profile.role === 'ADMIN') {
                throw { name: 'Modified payload.' };
            }

            await profile.destroy();

            res.status(200).json({
                message: 'Profile deleted successfully.'
            });
        } catch (error) {
            console.log(error);

            next(error);
        }
    }

    static async getMyProfile(req, res, next) {
        try {
            const classDetail = await Classroom.findOne({
                where : {
                    id : req.user?.ClassRoomId || ""
                } 
            })

            if (!classDetail) {
                throw {name: 'Modified payload.'}
            }

            const myClassroom = `${classDetail.grade} - ${classDetail.code}`

            const myProfile = {
                name : req.user?.name||"",
                birthDate : req.user?.birthDate||"",
                religion : req.user?.religion||"",
                gender : req.user?.gender||"",
                role : req.user?.role||"",
                classroom : myClassroom
            }

            res.status(200).json({
                message: 'Profiles retrieved successfully.',
                data: myProfile
            });
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ProfileController