const studentAuthorization = async (req, res, next) => {
    try {
        if (req.user.role !== "SISWA") {
            throw {name : "Forbidden."};
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = studentAuthorization;