const { User, Profile, Classroom } = require('../../models');
const validator = require('validator');
const bcrypt = require('../../helpers/bcrypt');
const jwt = require('jsonwebtoken');
const {encryptToken} = require('../../helpers/node-rsa')

class AuthenticationController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                throw { name: 'Invalid input.' };
            }

            const sanitizedEmail = validator.normalizeEmail(email);
            if (!validator.isEmail(sanitizedEmail)) {
                throw { name: 'Invalid input.' };
            }

            const sanitizedPassword = validator.escape(password);

            const user = await User.findOne({ 
                where: { email: sanitizedEmail }, 
                include: {
                    model: Profile,
                    attributes: ['name', 'role', 'religion', 'ClassRoomId'],
                    include: {
                        model: Classroom,
                        attributes: ['grade', 'code']
                    }
                }
            });

            if (!user) {
                throw { name: 'Authentication error.' };
            }

            const isPasswordValid = await bcrypt.comparePassword(sanitizedPassword, user.password);
            if (!isPasswordValid) {
                throw { name: 'Authentication error.' };
            }

            const { name, role, religion } = user.Profile;
            const { grade, code } = user.Profile.Classroom;

            const payload = {
                id: user.id,
                email: user.email,
                name,
                role,
                religion,
                grade,
                code
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
            
            const encryptedToken = encryptToken(token)

            res.cookie('cookie', encryptedToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 12 * 60 * 60 * 1000,
            });

            res.status(200).json({
                message: 'Login successful.'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthenticationController;