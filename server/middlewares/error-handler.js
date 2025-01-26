async function errorHandler(error, req, res, next) {
    switch (error.name) {
        case 'SequelizeUniqueConstraintError' :
            res.status(400).json({message: error.errors.map(el => el.message)})
            break
        case 'SequelizeValidationError' :
            res.status(400).json({message: error.errors.map(el => el.message)})
            break
        case 'Data not found.' :
            res.status(404).json({message: "DATA HAS NOT FOUND"})
            break
        case 'Empty input field.' :
            res.status(400).json({message: "INPUT FIELD CAN'T BE EMPTY!"})
            break
        case 'Invalid input.' :
            res.status(400).json({message: "INVALID INPUT NOT ALLOWED!"})
            break
        case 'Duplicated.' :
            res.status(400).json({message: "DATA ALREADY EXIST!"})
            break
        case 'Email already used.' :
            res.status(400).json({message: "EMAIL ALREADY USED, PLEASE USE ANOTHER EMAIL!"})
            break
        case 'Password did not match.' :
            res.status(400).json({message: "PASSWORD DID NOT MATCH!"})
            break
        case 'Invalid grade value.' :
            res.status(400).json({message: "INVALID CLASS GRADE!"})
            break
        case 'Invalid code format.' :
            res.status(400).json({message: "INVALID CODE FORMAT!"})
            break
        case 'Modified payload.' :
            res.status(400).json({message: "PAYLOAD CONTAIN(S) MODIFIER!"})
            break
        case 'User not registered.' :
            res.status(401).json({message: "WRONG EMAIL OR PASSWORD!"})
            break
        case 'Authentication error.' :
            res.status(401).json({message: "WRONG EMAIL OR PASSWORD!"})
            break
        case 'Forbidden.':
            res.status(403).json({message: "UNAUTHORIZED!"})
            break
        case 'JsonWebTokenError':
        case 'Unauthenticated.':
            res.status(401).json({message: "AUTHENTICATION FAILED!"})
            break
        default:
            res.status(500).json({message: "INTERNAL SERVER ERROR"})
            break
    }
}

module.exports = errorHandler