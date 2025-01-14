const { Subject } = require('../../models');
const { textToLow } = require('../../helpers/loweringText');
const { Op } = require('sequelize')
const validator = require('validator');

class SubjectController {
    static async createSubject(req, res, next) {
        try {
            const allowedFields = ['name'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }
    
            let { name } = req.body;
    
            if (!/^[a-zA-Z]+$/.test(name)) {
                throw { name: 'Invalid input.' };
            }
    
            name = name.trim().toUpperCase();
    
            let baseCode = name.substring(0, 3).toUpperCase();
            let code = baseCode;
    
            let counter = 1;
            while (await Subject.findOne({ where: { code } })) {
                code = `${baseCode}${counter}`;
                counter++;
            }
    
            const subject = await Subject.create({ name, code });
    
            res.status(201).json({
                message: 'Subject created successfully.',
                subject
            });
        } catch (error) {
            next(error);
        }
    }    

    static async getSubject(req, res, next) {
        try {
            const subjects = await Subject.findAll({
                order: [['name', 'ASC']]
            });

            res.status(200).json({
                message: 'Subjects retrieved successfully.',
                subjects
            });
        } catch (error) {
            next(error);
        }
    }

    static async editSubject(req, res, next) {
        try {
            const allowedFields = ['id', 'name'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }
    
            const { id, name } = req.body;
    
            const sanitizedId = validator.toInt(id || '', 10);
    
            if (!sanitizedId) {
                throw { name: 'Data not found.' };
            }
    
            if (!name || !/^[a-zA-Z]+$/.test(name)) {
                throw { name: 'Invalid input.' };
            }
    
            const subject = await Subject.findOne({ where: { id: sanitizedId } });
    
            if (!subject) {
                throw { name: 'Data not found.' };
            }
    
            const updatedName = name.trim().toUpperCase();
            let baseCode = updatedName.substring(0, 3).toUpperCase();
            let code = baseCode;
    
            let counter = 1;
            while (await Subject.findOne({ where: { code, id: { [Op.ne]: sanitizedId } } })) {
                code = `${baseCode}${counter}`;
                counter++;
            }
    
            await subject.update({
                name: updatedName,
                code
            });
    
            res.status(200).json({
                message: 'Subject updated successfully.',
                subject
            });
        } catch (error) {
            console.log(error);
            
            next(error);
        }
    }
    

    static async deleteSubject(req, res, next) {
        try {
            const allowedFields = ['id'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { id } = req.body;

            const sanitizedId = validator.toInt(id || '', 10);
            if (!sanitizedId) {
                throw { name: 'Modified payload.' };
            }

            const subject = await Subject.findOne({ where: { id: sanitizedId } });
            if (!subject) {
                throw { name: 'Data not found.' };
            }

            await subject.destroy();

            res.status(200).json({
                message: 'Subject deleted successfully.'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SubjectController;
