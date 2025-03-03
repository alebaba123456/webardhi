const { ScoreReport, Examination, sequelize, Subject, Profile, Classroom } = require('../../models');
const validator = require('validator');
const { Op } = require('sequelize');

class ReportController {
    static async getScoreReport(req, res, next) {
        try {
            const allowedFields = ['page', 'size', 'keyword', 'category', 'order'];

            const extraFields = Object.keys(req.query).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'Modified payload.' };
            }

            let offset = null;
            let limit = null;

            if (req.query.page && req.query.size) {
                const page = Math.max(validator.toInt(req.query.page, 10) || 1, 1);
                const size = Math.max(validator.toInt(req.query.size, 10) || 10, 1);

                offset = (page - 1) * size;
                limit = size;
            }

            let whereClause = {};
            let orderClause = [
                [Examination, Subject, 'name', 'ASC'],
                [Examination, 'examinationDate', 'ASC']
            ];

            if (req.query.category) {
                const sanitizedCategory = validator.escape(req.query.category.toLowerCase());

                if (!['name', 'ExaminationId'].includes(sanitizedCategory)) {
                    throw { name: 'Invalid category.' };
                }

                if (req.query.keyword) {
                    const sanitizedKeyword = validator.escape(req.query.keyword);

                    const [fieldInfo] = await sequelize.query(
                        `SELECT data_type FROM information_schema.columns WHERE table_name = 'ScoreReports' AND column_name = :category`,
                        { replacements: { category: sanitizedCategory }, type: sequelize.QueryTypes.SELECT }
                    );

                    if (!fieldInfo) {
                        throw { name: 'Invalid category.' };
                    }

                    const isStringField = ['character varying', 'text'].includes(fieldInfo.data_type);

                    if (isStringField) {
                        whereClause[sanitizedCategory] = { [Op.iLike]: `%${sanitizedKeyword}%` };
                    } else if (fieldInfo.data_type === 'integer') {
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
                const sanitizedOrder = validator.escape(req.query.order.toLowerCase());

                if (!['asc', 'desc'].includes(sanitizedOrder)) {
                    throw { name: 'Invalid order value.' };
                }

                if (req.query.category) {
                    orderClause.push([req.query.category, sanitizedOrder]);
                }
            }

            if (req.user.role === 'SISWA') {
                whereClause.ProfileId = req.user.id;
            } else if (req.user.role === 'GURU') {
                const subjects = await Subject.findAll({
                    where: { ProfileId: req.user.id },
                    attributes: ['id'],
                });

                const subjectIds = subjects.map(subject => subject.id);

                const examinations = await Examination.findAll({
                    where: { SubjectId: { [Op.in]: subjectIds } },
                    attributes: ['id'],
                });

                const examinationIds = examinations.map(exam => exam.id);

                whereClause.ExaminationId = { [Op.in]: examinationIds };
            }

            const reports = await ScoreReport.findAll({
                where: whereClause,
                order: orderClause,
                offset,
                limit,
                include: [
                    { 
                        model: Examination, 
                        attributes: ['code', 'examinationDate'], 
                        include: [
                            {
                                model : Subject,
                                attributes: ['name'],
                            }
                        ],
                    },
                    {
                        model: Profile,
                        attributes: ['name'],
                        include: [
                            {
                                model: Classroom,
                                attributes : ['grade', 'code']
                            }
                        ]
                    }
                ],
            });

            const totalReports = await ScoreReport.count({ where: whereClause });

            res.status(200).json({
                message: 'Score reports retrieved successfully.',
                data: reports,
                totalData: Math.ceil(totalReports / (limit || 1)),
            });
        } catch (error) {
            console.log(error);
            
            next(error);
        }
    }
}

module.exports = ReportController;
