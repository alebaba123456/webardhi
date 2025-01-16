const jwt = require('jsonwebtoken');
const forge = require('node-forge');
const dotenv = require('dotenv');

dotenv.config();

const authentication = async (req, res, next) => {
    const encryptedToken = req.cookies?.authToken;
    const jwtKey = process.env.JWT_SECRET;
    const encryptionKey = process.env.AES_SECRET_KEY;
    const iv = process.env.AES_IV;

    try {
        if (!encryptedToken) {
            throw { name: 'Unauthenticated.' }
        }

        const decipher = forge.cipher.createDecipher('AES-CBC', encryptionKey);
        decipher.start({ iv });
        decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedToken)));
        const success = decipher.finish();

        if (!success) {
            throw { name: 'DecryptionError', message: 'Failed to decrypt token.' };
        }
        const decryptedToken = decipher.output.toString();
        const decoded = jwt.verify(decryptedToken, jwtKey);
        req.user = decoded;
        next();
    } catch (error) {
        next(error)
    }
};

module.exports = authentication;
