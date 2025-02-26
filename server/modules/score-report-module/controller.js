const { Op } = require('sequelize');
const { ScoreReport, Examination, Subject, Profile } = require('../../models');
const validator = require('validator');

class ReportController {
    static async getReport(req, res, next) {
        try {
            // Validasi query parameter yang diizinkan
            const allowedFields = ['page', 'size', 'keyword', 'category', 'order'];
            const extraFields = Object.keys(req.query).filter(key => !allowedFields.includes(key));

            if (extraFields.length > 0) {
                throw { name: 'InvalidQuery', message: `Invalid query fields: ${extraFields.join(', ')}` };
            }

            // Pagination handling
            let sanitizedSize = req.query.size ? validator.toInt(req.query.size) : 10;
            let sanitizedPage = req.query.page ? validator.toInt(req.query.page) : 1;

            const offset = (sanitizedPage - 1) * sanitizedSize;
            const limit = sanitizedSize;

            // Inisialisasi kondisi
            let reportWhereClause = {};
            let subjectWhereClause = {};

            // Filtering berdasarkan kategori dan keyword
            if (req.query.category && req.query.keyword) {
                const sanitizedCategory = validator.escape(req.query.category || "");
                const sanitizedKeyword = validator.escape(req.query.keyword || "");

                if (!['ProfileId', 'SubjectId'].includes(sanitizedCategory)) {
                    throw { name: 'InvalidCategory', message: 'Invalid category for filtering.' };
                }

                // Validasi UUID
                if (!validator.isUUID(sanitizedKeyword)) {
                    throw { name: 'InvalidUUID', message: 'Keyword must be a valid UUID.' };
                }

                if (sanitizedCategory === 'ProfileId') {
                    reportWhereClause.ProfileId = sanitizedKeyword;
                } else if (sanitizedCategory === 'SubjectId') {
                    subjectWhereClause.id = sanitizedKeyword;
                }
            }

            // Filter berdasarkan role
            if (req.user.role === 'SISWA') {
                reportWhereClause.ProfileId = req.user.id;
            } else if (req.user.role === 'GURU') {
                subjectWhereClause.ProfileId = req.user.id;
            }

            // Menentukan urutan (sorting)
            let orderClause = [
                [Examination, Subject, 'name', 'ASC'], // Urutkan berdasarkan nama mata pelajaran
                [Examination, 'examinationDate', 'ASC'] // Urutkan berdasarkan tanggal ujian
            ];

            if (req.query.order) {
                const sanitizedOrder = validator.escape(req.query.order.toLowerCase() || "");
                if (!['asc', 'desc'].includes(sanitizedOrder)) {
                    throw { name: 'InvalidOrder', message: 'Order must be either "asc" or "desc".' };
                }
                orderClause.unshift(['score', sanitizedOrder]);
            }

            // Ambil data report
            const reports = await ScoreReport.findAll({
                where: reportWhereClause,
                include: [
                    {
                        model: Examination,
                        include: [
                            {
                                model: Subject,
                                where: Object.keys(subjectWhereClause).length ? subjectWhereClause : undefined,
                                include: [{ model: Profile, attributes: ['id', 'name'] }]
                            }
                        ]
                    }
                ],
                offset,
                limit,
                order: orderClause
            });

            // Hitung total data untuk pagination
            const totalReports = await ScoreReport.count({
                where: reportWhereClause,
                include: [
                    {
                        model: Examination,
                        include: [
                            {
                                model: Subject,
                                where: Object.keys(subjectWhereClause).length ? subjectWhereClause : undefined
                            }
                        ]
                    }
                ]
            });

            res.status(200).json({
                message: 'Report data retrieved successfully.',
                data: reports,
                totalData: Math.ceil(totalReports / sanitizedSize),
                currentPage: sanitizedPage,
                totalItems: totalReports
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReportController;
