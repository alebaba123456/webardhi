const dotenv = require('dotenv');
const { Session, User, Profile } = require('../models');
const { Op } = require('sequelize');
dotenv.config();

const authentication = async (req, res, next) => {
    const session = req.cookies?.cookie;
    const pubKey = req.cookies?.cookie_one;
    
    try {
        if (!session || !pubKey) {
            throw { name: 'Unauthenticated.' };
        }
        
        const existingSession = await Session.findOne({
            where: {
                session: session
            },
            include: [
                {
                    model: User,
                    include: [Profile],
                }
            ]
        });
        
        if (!existingSession) {
            await clearSession(res, session);
            throw { name: 'Unauthenticated.' };
        }
        
        const sessionCreatedAt = new Date(existingSession.createdAt);
        const currentTime = new Date();
        const hoursDifference = Math.abs(currentTime - sessionCreatedAt) / (1000 * 60 * 60);
        
        if (hoursDifference > 12) {
            
            await clearSession(res, session);
            throw { name: 'Session expired.' };
        }
        
        req.user = existingSession.User.Profile;
        req.session = existingSession;
        next();
    } catch (error) {
        next(error);
    }
};

const clearSession = async (res, session) => {
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
    await Session.destroy({
        where: {
            session: session
        }
    });
};

module.exports = authentication;