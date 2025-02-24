const { Examination, Session } = require('../../models');
const validator = require('validator');

class ExaminationSessionController {
    static async startExamination(req, res, next) {
        try {
            const allowedFields = ['ExaminationId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'InvalidQuery', message: `Invalid query fields: ${extraFields.join(', ')}` };
            }

            const { ExaminationId } = req.body;
            console.log(req.user);
            console.log(ExaminationId);
            
            // if (req.user) {
                
            // }
            res.status(200).json({
                message: 'Ok'
            })
        } catch (error) {
            console.log(error);

            next(error)
        }
    }
}

module.exports = ExaminationSessionController
