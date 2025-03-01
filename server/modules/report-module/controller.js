const { ScoreReport } = require('../../models');
const validator = require('validator');
const { Op } = require('sequelize')

class ReportController {
    static async getScoreReport(req, res, next) {
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
                if (!['name', 'ExaminationId'].includes(sanitizedCategory)) {
                    throw { name: 'Modified payload.' };
                }

                if (req.query.keyword) {
                    const sanitizedKeyword = validator.escape(req.query.keyword || "");

                    const [fieldType] = await ScoreReport.sequelize.query(`
                                            SELECT data_type 
                                            FROM information_schema.columns 
                                            WHERE table_name = 'ScoreReports' AND column_name = '${sanitizedCategory}'
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
                orderClause.push([category, sanitizedOrder]);
            }

            if (req.user.role === 'GURU') {
                whereClause.ProfileId = req.user.id
            } else if (req.user.role === 'SISWA') {
                whereClause.ProfileId = req.user.id
            }

            const reports = await ScoreReport.findAll({
                where: whereClause,
                order: orderClause,
                ...(offset !== null && limit !== null ? { offset, limit } : {}),
                include: [
                    { model: Examination, attributes: ['code', 'name'] },
                ]
            });

            const totalReports = await ScoreReport.count({
                where: whereClause
            });

            res.status(200).json({
                message: 'Score reports retrieved successfully.',
                data: reports,
                totalData: Math.ceil(totalReports / req.query.size),
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReportController