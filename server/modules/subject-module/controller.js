const { Subject } = require('../../models');
const { textToLow } = require('../../helpers/loweringText');
const validator = require('validator');

class SubjectController {
    static async createSubject(req, res, next) {
        try {
            const allowedFields = ['name', 'code'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { name, code } = req.body;

            const sanitizedName = validator.escape(textToLow(name || ''));
            const sanitizedCode = (code || '').toUpperCase();

            if (!sanitizedName || !sanitizedCode) {
                throw { name: 'Empty input field.' };
            }

            if (!/^[A-Z]*$/.test(sanitizedCode)) {
                throw { name: 'Invalid code format.' };
            }

            const subject = await Subject.create({
                name: sanitizedName,
                code: sanitizedCode
            });

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
            const subjects = await Subject.findAll();

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
            const allowedFields = ['id', 'name', 'code'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { id, name, code } = req.body;

            const sanitizedId = validator.toInt(id || '', 10);
            const sanitizedName = validator.escape(textToLow(name || ''));
            const sanitizedCode = (code || '').toUpperCase();

            if (!sanitizedId) {
                throw { name: 'Data not found.' };
            }

            if (!sanitizedName || !sanitizedCode) {
                throw { name: 'Empty input field.' };
            }

            if (!/^[A-Z]*$/.test(sanitizedCode)) {
                throw { name: 'Invalid code format.' };
            }

            const subject = await Subject.findOne({ where: { id: sanitizedId } });

            if (!subject) {
                throw { name: 'Data not found.' };
            }

            await subject.update({
                name: sanitizedName,
                code: sanitizedCode
            });

            res.status(200).json({
                message: 'Subject updated successfully.',
                subject
            });
        } catch (error) {
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
                throw { name: 'Data not found.' };
            }

            const subject = await Subject.findOne({ where: { id: sanitizedId } });
            if (!subject) {
                throw { name: 'SubjectNotFound', message: 'Subject not found.' };
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
