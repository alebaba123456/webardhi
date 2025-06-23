const authorization = async (req, res, next) => {
    try {
        const allowedRoles = ["ADMIN", "KEPALA_SEKOLAH", "WAKIL_KEPALA_SEKOLAH"];
        if (!allowedRoles.includes(req.user.role)) {
            throw { name: "Forbidden." };
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        
        next(error);
    }
};

module.exports = authorization;
