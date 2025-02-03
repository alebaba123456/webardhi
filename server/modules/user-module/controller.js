const { encryptWithRSA, decryptWithRSA } = require('../../helpers/crypto');
const jwt = require('jsonwebtoken');
const { User, Profile } = require('../../models');
const crypto = require('crypto');
const { sendUserVerification, sendRequestResetPassword, sendConfirmResetPassword } = require('../../helpers/nodemailer');
const { comparePassword } = require('../../helpers/bcrypt');
const validator = require('validator');

class UserController {
    static async createUser(req, res, next) {
        try {
            const allowedFields = ['email', 'ProfileId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { email, ProfileId } = req.body;

            if (!email || !ProfileId) {
                throw { name: 'Invalid input.' };
            }

            const existingUser = await User.findOne({
                where: {
                    email: email.toLowerCase()
                }
            });

            if (existingUser) {
                throw { name: 'Email already used.' };
            }

            const profile = await Profile.findByPk(ProfileId);
            if (!profile) {
                throw { name: 'Data not found.' };
            }

            const username = profile.name;
            const password = crypto.randomBytes(12).toString('base64url');

            await User.create({
                email: email.toLowerCase(),
                username,
                password,
                ProfileId,
            });

            const userMail = process.env.EMAIL_USER
            const userPass = process.env.EMAIL_PASS
            await sendUserVerification( userMail, userPass, email, username, password )

            res.status(201).json({
                message: 'User created successfully. Login credentials sent to the provided email.'
            });
        } catch (error) {
            next(error);
        }
    }

    static async changeUserPassword(req, res, next) {
        try {
            const allowedFields = ['oldPassword', 'newPassword', 'confirmationNewPassword'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }
            
            const { oldPassword, newPassword, confirmationNewPassword } = req.body;
            
            const sanitizedOldPassword = validator.escape(oldPassword || "");
            const sanitizedNewPassword = validator.escape(newPassword || "");
            const sanitizedConfirmationPassword = validator.escape(confirmationNewPassword || "")

            if (!sanitizedNewPassword || !sanitizedOldPassword || !sanitizedConfirmationPassword) {
                throw { name: 'Invalid input.' };
            }
            
            if (sanitizedNewPassword !== sanitizedConfirmationPassword) {
                throw { name: 'Password did not match.' };
            }
            
            const user = await User.findOne({
                where: {
                    ProfileId : req.user.id
                }
            });

            if (!user) {
                throw { name: 'Modified payload.' };
            }
            
            const isPasswordMatch = await comparePassword(sanitizedOldPassword, user.password);
            if (!isPasswordMatch) {
                throw { name: 'Invalid password.' };
            }

            await user.update({ password: sanitizedNewPassword });

            res.status(200).json({
                message: 'Password changed successfully.',
            });
        } catch (error) {
            next(error);
        }
    }

    static async requestForgetPassword(req, res, next) {
        try {
            const { UserId } = req.body;

            const user = await User.findByPk(UserId);
            if (!user) throw { name: 'Data not found.' };

            const tokenPayload = { UserId: user.id };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30m', algorithm: 'HS256' });

            const userMail = process.env.EMAIL_USER
            const userPass = process.env.EMAIL_PASS
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

            await sendRequestResetPassword(baseUrl, userMail, userPass, user.email, token);

            res.status(200).json({ message: 'Reset password email sent successfully.' });
        } catch (error) {
            next(error);
        }
    }

    static async confirmForgetPassword(req, res, next) {
        try {
            const { token } = req.params;

            const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

            const user = await User.findByPk(payload.UserId);
            if (!user) throw { name: 'Data not found.' };

            const newPassword = this.generateRandomPassword();

            await user.update({ password: newPassword });

            const userMail = process.env.EMAIL_USER
            const userPass = process.env.EMAIL_PASS

            await sendConfirmResetPassword(userMail, userPass, user.email, newPassword);

            res.status(200).json({ message: 'Password reset successfully. Check your email.' });
        } catch (error) {
            next(error);
        }
    }

    static generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        return Array.from({ length: 12 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }
}

module.exports = UserController;
