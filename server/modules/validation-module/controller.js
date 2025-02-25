class ValidationController {
    static async validation (req, res, next) {
        try {
            if (req.session.status) {
                res.status(200).json({ message: 'On Exam!', data: req.session.examQuestion });
            } else {
                res.status(200).json({ message: 'Authenticated' });
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ValidationController;