const teacherAuthorization = async (req, res, next) => {
    try {
        if (!["ADMIN", "GURU"].includes(req.user.role)) {
            throw {name : "Forbidden."};
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = teacherAuthorization;