const { User, Session } = require('../../models');
const validator = require('validator');
const bcrypt = require('../../helpers/bcrypt');
const { generateRSAKeyPair } = require('../../helpers/crypto');
const crypto = require('crypto');
const { sendSessionVerification } = require('../../helpers/nodemailer');
const { encryptWithRSA_OAEP, decryptWithRSA } = require('../../helpers/crypto');
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
                const token = jwt.sign(sessionPayload, existingSession.privateKey, { expiresIn: '30m', algorithm: 'RS256' });
                await sendSessionVerification(email, token);
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
            const privateKey = process.env.RSA_PRIVATE_KEY;
            const decryptedToken = decryptWithRSA(decodeURIComponent(token), privateKey);

            const payload = jwt.verify(decryptedToken, process.env.JWT_SECRET, { algorithms: ['HS256'] });
            await Session.destroy({
                where: {
                    session : payload.session
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthenticationController;