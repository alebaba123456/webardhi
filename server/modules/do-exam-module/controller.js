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
            console.log(req.user);
            
            // if (req.user) {
                
            // }
        } catch (error) {
            console.log(error);

            next(error)
        }
    }
}

module.exports = ExaminationSessionController
