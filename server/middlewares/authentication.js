const jwt = require('jsonwebtoken');
const forge = require('node-forge');
const dotenv = require('dotenv');

dotenv.config();

const authentication = async (req, res, next) => {
    const encryptedToken = req.cookies?.cookie;
    const iv = req.cookies?.cookie_india;
    const tag = req.cookies?.cookie_tango;
    const jwtKey = process.env.JWT_SECRET;
    
    try {
        if (!encryptedToken || !iv || !tag) {
            throw { name: 'Unauthenticated.' }
        }
        
        const encryptionKey = forge.util.createBuffer(process.env.AES_SECRET_KEY, 'utf8');
        const decipher = forge.cipher.createDecipher('AES-GCM', encryptionKey.bytes());

        decipher.start({
            iv: forge.util.decode64(iv),
            tag: forge.util.decode64(tag),
        });
        decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedToken)));
        const success = decipher.finish();

        if (!success) {
            throw { name: 'DecryptionError', message: 'Failed to decrypt token.' };
        }
        const decryptedToken = decipher.output.toString();
        const decoded = jwt.verify(decryptedToken, jwtKey);
        if (!decoded) {
            res.clearCookie('cookie', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            res.clearCookie('cookie_india', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            res.clearCookie('cookie_tango', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
        }
        req.user = decoded;
        next();
    } catch (error) {     
        next(error)
    }
};

module.exports = authentication;
