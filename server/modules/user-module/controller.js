const { encryptWithRSA, decryptWithRSA } = require('../../helpers/crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const forge = require('node-forge');
const { User, Profile } = require('../../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UserController {
    static async createUser(req, res, next) {
        try {
            const { email, ProfileId } = req.body;

            if (!email || !ProfileId) {
                throw { name: 'InvalidInput', message: 'Email and ProfileId are required.' };
            }

            const profile = await Profile.findByPk(ProfileId);
            if (!profile) {
                throw { name: 'DataNotFound', message: 'Profile not found.' };
            }

            const username = profile.name;
            const password = crypto.randomBytes(8).toString('base64url');

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                email,
                username,
                password: hashedPassword,
                ProfileId,
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: '"Al-Husna Admin" <no-reply@alhusna.com>',
                to: email,
                subject: 'Al-Husna - Pendaftaran User Baru',
                text: `Dear ${username},\n\nYour user account has been successfully created.\n\nEmail: ${email}\nPassword: ${password}\n\nPlease keep this information confidential.\n\nBest regards,\nAl-Husna Team`,
            };

            await transporter.sendMail(mailOptions);

            res.status(201).json({
                message: 'User created successfully. Login credentials sent to the provided email.',
                data: { id: newUser.id, email: newUser.email },
            });
        } catch (error) {
            next(error);
        }
    }

    static async changeUserPassword(req, res, next) {
        try {
            const { UserId, oldPassword, newPassword, confirmationNewPassword } = req.body;

            if (!UserId || !oldPassword || !newPassword || !confirmationNewPassword) {
                throw { name: 'InvalidInput', message: 'All fields are required.' };
            }

            const user = await User.findByPk(UserId);
            if (!user) {
                throw { name: 'DataNotFound', message: 'User not found.' };
            }

            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordMatch) {
                throw { name: 'InvalidInput', message: 'Old password is incorrect.' };
            }

            if (newPassword !== confirmationNewPassword) {
                throw { name: 'PasswordMismatch', message: 'New password and confirmation password do not match.' };
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await user.update({ password: hashedPassword });

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
            if (!user) throw { name: 'DataNotFound', message: 'User not found.' };

            const tokenPayload = { UserId: user.id };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30m', algorithm: 'HS256' });

            const publicKey = process.env.RSA_PUBLIC_KEY;
            const encryptedToken = encryptWithRSA(token, publicKey);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const resetLink = `https://yourdomain.com/user/confirm/${encodeURIComponent(encryptedToken)}`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Al Husna - Request Lupa Password',
                html: `<p>Silakan klik link berikut untuk mereset password Anda:</p>
                       <a href="${resetLink}">${resetLink}</a>
                       <p>Link ini hanya berlaku selama 30 menit.</p>`,
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'Reset password email sent successfully.' });
        } catch (error) {
            next(error);
        }
    }

    static async confirmForgetPassword(req, res, next) {
        try {
            const { token } = req.params;

            const privateKey = process.env.RSA_PRIVATE_KEY;
            const decryptedToken = decryptWithRSA(decodeURIComponent(token), privateKey);

            const payload = jwt.verify(decryptedToken, process.env.JWT_SECRET, { algorithms: ['HS256'] });

            const user = await User.findByPk(payload.UserId);
            if (!user) throw { name: 'DataNotFound', message: 'User not found.' };

            const newPassword = this.generateRandomPassword();
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await user.update({ password: hashedPassword });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Al Husna - Password Reset',
                html: `<p>Password Anda telah direset. Berikut adalah password baru Anda:</p>
                       <p><strong>${newPassword}</strong></p>
                       <p>Segera ganti password ini setelah login untuk keamanan.</p>`,
            };

            await transporter.sendMail(mailOptions);

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
