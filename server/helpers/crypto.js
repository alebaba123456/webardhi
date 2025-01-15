const forge = require('node-forge');

function encryptWithRSA(data, publicKey) {
    const publicKeyForge = forge.pki.publicKeyFromPem(publicKey);
    return forge.util.encode64(publicKeyForge.encrypt(data));
}

function decryptWithRSA(encryptedData, privateKey) {
    const privateKeyForge = forge.pki.privateKeyFromPem(privateKey);
    return privateKeyForge.decrypt(forge.util.decode64(encryptedData));
}

module.exports = {
    encryptWithRSA,
    decryptWithRSA,
};
