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
            const allowedFields = ['page', 'size', 'keyword', 'category', 'order'];

            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            let offset = null;
            let limit = null;

            if (req.query.page && req.query.size) {
                const sanitizedPage = validator.toInt(req.query.page || 1);
                const sanitizedSize = validator.toInt(req.query.size || 10);

                const page = sanitizedPage > 0 ? sanitizedPage : 1;
                const size = sanitizedSize > 0 ? sanitizedSize : 10;

                offset = (page - 1) * size;
                limit = size;
            }

            let whereClause = {};
            let orderClause = [];

            if (req.query.category) {
                const sanitizedCategory = validator.escape(req.query.category.toLowerCase() || "");
                if (!['name', 'code'].includes(sanitizedCategory)) {
                    throw { name: 'Modified payload.' };
                }

                if (req.query.keyword) {
                    const sanitizedKeyword = validator.escape(req.query.keyword || "");

                    const [fieldType] = await Subject.sequelize.query(`
                                    SELECT data_type 
                                    FROM information_schema.columns 
                                    WHERE table_name = 'Subjects' AND column_name = '${sanitizedCategory}'
                                `);

                    if (!fieldType || !fieldType.length) {
                        throw { name: 'Invalid category.' };
                    }

                    const isStringField = ['character varying', 'text'].includes(fieldType[0].data_type);

                    if (isStringField) {
                        whereClause[sanitizedCategory] = { [Op.iLike]: `%${sanitizedKeyword}%` };
                    } else if (fieldType[0].data_type === 'integer') {
                        const keywordAsInt = parseInt(sanitizedKeyword, 10);
                        if (isNaN(keywordAsInt)) {
                            throw { name: 'Invalid keyword for integer field.' };
                        }
                        whereClause[sanitizedCategory] = keywordAsInt;
                    } else {
                        throw { name: 'Unsupported field type.' };
                    }
                }
            }

            if (req.query.order) {
                const sanitizedOrder = validator.escape(req.query.order.toLowerCase() || "");
                if (!['asc', 'desc'].includes(sanitizedOrder)) {
                    throw { name: 'Modified payload.' };
                }
                orderClause.push(['id', sanitizedOrder]);
            }

            const subjects = await Subject.findAll({
                where: whereClause,
                order: orderClause,
                ...(offset !== null && limit !== null ? { offset, limit } : {}),
            });

            const totalSubject = await Subject.count({
                where: whereClause
            });

            res.status(200).json({
                message: 'Subjects retrieved successfully.',
                data: subjects,
                totalData: Math.ceil(totalSubject / req.query.size),
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
    
            const sanitizedId = validator.escape(id || "");
            const isAnUUID = validator.isUUID(sanitizedId);
            if (!isAnUUID) {
                throw { name: 'Modified payload.' };
            }
    
            const subject = await Subject.findOne({ where: { id: sanitizedId } });
    
            if (!subject) {
                throw { name: 'Data not found.' };
            }

            const sanitizedName = validator.escape(name || "")
    
            const updatedName = sanitizedName.trim().toUpperCase();
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
            next(error);
        }
    }    

    static async deleteSubject(req, res, next) {
        try {  
            const allowedFields = ['id'];
            const extraFields = Object.keys(req.params).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            const { id } = req.params;
            const sanitizedId = validator.escape(id || "")
            const isAnUUID = validator.isUUID(sanitizedId);
            if (!isAnUUID) {
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
