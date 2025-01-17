const jwt = require('jsonwebtoken');
const forge = require('node-forge');
const dotenv = require('dotenv');

dotenv.config();

const authentication = async (req, res, next) => {
    const encryptedToken = req.cookies?.cookie;
    const jwtKey = process.env.JWT_SECRET;

    try {
        if (!encryptedToken) {
            throw { name: 'Unauthenticated.' }
        }
        
        const encryptionKey = forge.util.createBuffer(process.env.AES_SECRET_KEY, 'utf8');
        const iv = forge.util.createBuffer(process.env.AES_IV, 'utf8');

        const decipher = forge.cipher.createDecipher('AES-CBC', encryptionKey);
        decipher.start({ iv });
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
        }
        req.user = decoded;
        
        next();
    } catch (error) {
        next(error)
    }
};

module.exports = authentication;
