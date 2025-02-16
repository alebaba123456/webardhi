const { User, Session } = require('../../models');
const validator = require('validator');
const bcrypt = require('../../helpers/bcrypt');
const { generateRSAKeyPair } = require('../../helpers/crypto');
const crypto = require('crypto');
const { sendSessionVerification } = require('../../helpers/nodemailer');
const jwt = require('jsonwebtoken');

class AuthenticationController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw { name: 'Empty input field.' };
            }

            const sanitizedEmail = validator.escape(email)

            if (!validator.isEmail(sanitizedEmail)) {
                throw { name: 'Invalid input.' };
            }

            const sanitizedPassword = validator.escape(password);

            const user = await User.findOne({
                where: {
                    email: email
                },
            });

            if (!user) {
                throw { name: 'Authentication error.' };
            }

            const isPasswordValid = await bcrypt.comparePassword(sanitizedPassword, user.password);
            if (!isPasswordValid) {
                throw { name: 'Authentication error.' };
            }

            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const { id } = user
            const screenWidth = req.headers['user-x']
            const screenHeight = req.headers['user-y']
            const device = req.headers['user-z']

            const fingerPrint = {
                ip,
                id,
                screenWidth,
                screenHeight,
                device
            }

            const existingSession = await Session.findOne({
                where: {
                    UserId: user.id
                }
            })

            if (existingSession && JSON.stringify(fingerPrint) !== existingSession?.fingerPrint) {
                const sessionPayload = {
                    id : existingSession.id,
                    session : existingSession.session
                }
                
                const userMail = process.env.EMAIL_USER
                const userPass = process.env.EMAIL_PASS
                const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

                const token = jwt.sign(sessionPayload, process.env.JWT_SECRET, { expiresIn: '30m', algorithm: 'HS256' });
                await sendSessionVerification(baseUrl, userMail, userPass, email, token);
                throw { name: 'Unauthenticated.' }
            } else {
                const { publicKey, privateKey } = generateRSAKeyPair()

                const session = crypto.randomBytes(32).toString('hex')

                await Session.create({
                    session: session,
                    privateKey: privateKey,
                    publicKey: publicKey,
                    fingerPrint: JSON.stringify(fingerPrint),
                    UserId: id,
                })

                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.cookie('cookie', session, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: 12 * 60 * 60 * 1000,
                });
                res.cookie('cookie_one', publicKey, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: 12 * 60 * 60 * 1000,
                })

                res.status(200).json({
                    message: 'Login successful.'
                });
            }

        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            await Session.destroy({
                where: {
                    session: req.session.session
                }
            })
            res.clearCookie('cookie', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            res.clearCookie('cookie_one', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            res.status(201).json({
                message: 'Logout successful.'
            });
        } catch (error) {
            next(error)
        }
    }

    static async resetSession(req, res, next) {
        try {
            const { token } = req.params
            if (!token) {
                throw {name: 'Modified payload.'}
            }
            const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: 'HS256' });
            await Session.destroy({
                where: {
                    session : payload.session
                }
            })
            res.status(200).json({
                message: 'Logout successful.'
            });
        } catch (error) {
            next(error)
        }
    }

    static async requestForgetPassword(req, res, next) {
        try {
            const { email } = req.body;

            const user = await User.findOne({
                where: {
                    email : email
                }
            });

            const sanitizedEmail = validator.escape(email||"");
            const isAnEmail = validator.isEmail(sanitizedEmail)
            if (!isAnEmail) {
                throw {name: 'Invalid input.'}
            }

            if (!user) throw { name: 'Data not found.' };

            const tokenPayload = { UserId: user.id };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30m', algorithm: 'HS256' });

            const userMail = process.env.EMAIL_USER;
            const userPass = process.env.EMAIL_PASS;
            const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

            // await sendRequestResetPassword(baseUrl, userMail, userPass, sanitizedEmail, token);

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
}

module.exports = AuthenticationController;