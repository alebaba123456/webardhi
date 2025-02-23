const authorization = async (req, res, next) => {
    try {
        if (req.user.role !== "ADMIN") {
            throw {name : "Forbidden."};
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = authorization;