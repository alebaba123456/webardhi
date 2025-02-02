const bcrypt = require ('bcrypt')

const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const comparePassword = async (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, comparePassword }