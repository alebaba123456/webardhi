const forge = require('node-forge');
const jwt = require('jsonwebtoken');

// Enkripsi dengan RSA-OAEP
function encryptWithRSA_OAEP(data, publicKey) {
    const publicKeyForge = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = publicKeyForge.encrypt(data, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
}

// Dekripsi dengan RSA-OAEP
function decryptWithRSA_OAEP(encryptedData, privateKey) {
    const privateKeyForge = forge.pki.privateKeyFromPem(privateKey);
    const decodedEncryptedData = forge.util.decode64(encryptedData);
    const decrypted = privateKeyForge.decrypt(decodedEncryptedData, 'RSA-OAEP');
    return decrypted;
}

// Fungsi untuk membuat pasangan kunci RSA
function generateRSAKeyPair(bits = 2048) {
    const keypair = forge.pki.rsa.generateKeyPair(bits);
    const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
    const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
    return { privateKey, publicKey };
}

// Tanda tangan JWT dengan algoritma RS256
function signJWTWithRS256(payload, privateKey, options = {}) {
    return jwt.sign(payload, privateKey, { algorithm: 'RS256', ...options });
}

module.exports = {
    encryptWithRSA_OAEP,
    decryptWithRSA_OAEP,
    generateRSAKeyPair,
    signJWTWithRS256
};
