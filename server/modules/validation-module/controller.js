class ValidationController {
    static async validation (req, res, next) {
        try {
            return res.status(200).json({ message: 'Authenticated' });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ValidationController;