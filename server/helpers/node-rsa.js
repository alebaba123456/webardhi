const forge = require('node-forge');

const encryptToken = (token) => {  
    const encryptionKey = forge.util.createBuffer(process.env.AES_SECRET_KEY, 'utf8');
    const iv = forge.util.createBuffer(process.env.AES_IV, 'utf8');

    const cipher = forge.cipher.createCipher('AES-CBC', encryptionKey);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(token, 'utf8'));
    cipher.finish();

    const encryptedToken = forge.util.encode64(cipher.output.bytes());

    return encryptedToken
}

module.exports = { encryptToken }