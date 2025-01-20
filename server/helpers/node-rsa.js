const forge = require('node-forge');

const encryptToken = (token) => {  
    const encryptionKey = forge.util.createBuffer(process.env.AES_SECRET_KEY, 'utf8');
    // const iv = forge.util.createBuffer(process.env.AES_IV, 'utf8');
    
    // const cipher = forge.cipher.createCipher('AES-CBC', encryptionKey);
    // cipher.start({ iv });
    // cipher.update(forge.util.createBuffer(token, 'utf8'));
    // cipher.finish();
    
    // const encryptedToken = forge.util.encode64(cipher.output.bytes());
    
    // return encryptedToken
    const iv = forge.random.getBytesSync(12);
    const cipher = forge.cipher.createCipher('AES-GCM', encryptionKey.bytes());
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(token, 'utf8'));
    cipher.finish();

    const encryptedToken = forge.util.encode64(cipher.output.bytes());
    const tag = forge.util.encode64(cipher.mode.tag.bytes());

    return { encryptedToken, tag, iv: forge.util.encode64(iv) };
}

module.exports = { encryptToken }