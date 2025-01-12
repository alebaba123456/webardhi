const { Profile, User } = require('../../models')
const { textToLow } = require('../../helpers/loweringText')
const validator = require('validator');

class UserController {
    static async createUser (req, res, next) {
        try {
            const allowedFields = [
                'username', 'password', 'matchPassword', 'email', 'name', 'birthDate', 'religion', 'gender', 'role', 'classroomId'
            ];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload' };
            }

            const { username, password, matchPassword, email, name, birthDate, religion, gender, role, classroomId } = req.body
            
            const sanitizedUsername = validator.escape(textToLow(username || ''));
            const sanitizedPassword = validator.escape(password || '');
            const sanitizedMatchPassword = validator.escape(matchPassword || '');
            const sanitizedEmail = validator.normalizeEmail(textToLow(email || ''));
            const sanitizedName = validator.escape(name || '');
            const sanitizedBirthDate = validator.toDate(birthDate) || null;
            const sanitizedReligion = validator.escape(religion || '');
            const sanitizedGender = validator.escape(gender || '');
            const sanitizedRole = validator.escape(role || '');
            const sanitizedClassroomId = validator.escape(classroomId || '');

            if (!sanitizedUsername || !sanitizedPassword || !sanitizedEmail) {
                throw {name : 'Empty input field.'}
            }

            if (sanitizedPassword !== sanitizedMatchPassword) {
                throw {name : 'Password did not match.'}
            }
            
            const profile = await Profile.create({
                name: sanitizedName,
                birthDate: sanitizedBirthDate,
                religion: sanitizedReligion,
                gender: sanitizedGender,
                role: sanitizedRole,
                classroomId: sanitizedClassroomId
            });

            const user = await User.create({
                email: sanitizedEmail,
                password: sanitizedPassword,
                username: sanitizedUsername,
                profileId: profile.id
            });

            res.status(201).json({
                message: 'User created successfully.',
                profile,
                user
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController