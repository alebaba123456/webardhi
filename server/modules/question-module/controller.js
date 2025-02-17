const { Op } = require('sequelize');
const { Question, Examination, } = require('../../models');
const validator = require('validator');

class QuestionController {
  static async getQuestion(req, res, next) {
    try {
      const allowedFields = ['page', 'size', 'keyword', 'category', 'order'];
      const extraFields = Object.keys(req.query).filter(key => !allowedFields.includes(key));

      if (extraFields.length > 0) {
        throw { name: 'InvalidQuery', message: `Invalid query fields: ${extraFields.join(', ')}` };
      }

      const sanitizedSize = validator.toInt(req.query.size || 0);
      const sanitizedPage = validator.toInt(req.query.page || 1);

      const offset = (sanitizedPage - 1) * sanitizedSize;
      const limit = sanitizedSize;

      let examWhereClause = {};
      let subjectWhereClause = {};

      if (req.query.category) {
        const sanitizedCategory = validator.escape(req.query.category || "");

        if (!['ProfileId', 'type'].includes(sanitizedCategory)) {
          throw { name: 'Modified payload.' };
        }

        if (req.query.keyword) {
          const sanitizedKeyword = validator.escape(req.query.keyword || "");

          if (sanitizedCategory === 'type') {
            const [fieldType] = await Examination.sequelize.query(`
                  SELECT data_type 
                  FROM information_schema.columns 
                  WHERE table_name = 'Examinations' AND column_name = '${sanitizedCategory}'
                `);

            if (!fieldType || !fieldType.length) {
              throw { name: 'Invalid category.' };
            }

            const dataType = fieldType[0].data_type;
            const isStringField = ['character varying', 'text'].includes(dataType);

            if (isStringField) {
              examWhereClause[sanitizedCategory] = { [Op.iLike]: `%${sanitizedKeyword}%` };
            } else if (dataType === 'integer') {
              const keywordAsInt = parseInt(sanitizedKeyword, 10);
              if (isNaN(keywordAsInt)) {
                throw { name: 'Invalid keyword for integer field.' };
              }
              examWhereClause[sanitizedCategory] = keywordAsInt;
            } else if (dataType === 'uuid') {
              if (!validator.isUUID(sanitizedKeyword)) {
                throw { name: 'Modified payload.' };
              }
              examWhereClause[sanitizedCategory] = sanitizedKeyword;
            } else {
              throw { name: 'Unsupported field type.' };
            }
          }

          else if (sanitizedCategory === 'ProfileId') {
            if (!validator.isUUID(sanitizedKeyword)) {
              throw { name: 'Modified payload.' };
            }
            subjectWhereClause.ProfileId = sanitizedKeyword;
          }
        }
      }

      let orderClause = [];
      if (req.query.order) {
        const sanitizedOrder = validator.escape(req.query.order.toLowerCase() || "");
        if (!['asc', 'desc'].includes(sanitizedOrder)) {
          throw { name: 'Modified payload.' };
        }
        orderClause.push(['id', sanitizedOrder]);
      }

      const examination = await Examination.findAll({
        where: examWhereClause,
        order: orderClause,
        offset,
        limit,
        include: [
          {
            model: Subject,
            where: Object.keys(subjectWhereClause).length ? subjectWhereClause : undefined,
            include: [
              {
                model: Profile,
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });

      const totalExamination = await Examination.count({
        where: examWhereClause,
        include: [
          {
            model: Subject,
            where: Object.keys(subjectWhereClause).length ? subjectWhereClause : undefined,
          }
        ]
      });

      res.status(200).json({
        message: 'Examination data retrieved successfully.',
        data: examination,
        totalData: Math.ceil(totalExamination / sanitizedSize),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createQuestion(req, res, next) {
    try {
      const allowedFields = ['ExaminationId', 'question', 'answer', 'option', 'type'];
      const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
      if (extraFields.length > 0) {
        throw { name: 'Modified payload.' };
      }

      const { ExaminationId, question, answer, option, type } = req.body;

      const sanitizedExaminationDate = validator.toDate(examinationDate || null);

      if (!sanitizedExaminationDate) {
        throw { name: 'Invalid date format.' };
      }

      const sanitizedExaminationId = validator.escape(ExaminationId || "")
      if (!validator.isUUID(sanitizedExaminationId)) {
        throw { name: 'Modified payload.' };
      }

      const subject = await Examination.findOne({
        where: {
          id: sanitizedExaminationId
        }
      })

      if (!subject) {
        throw { name: 'Data not found.' };
      }

      const examMonth = sanitizedExaminationDate.getMonth() + 1;
      const semester = (examMonth >= 7 && examMonth <= 12) ? 'GANJIL' : 'GENAP';
      const generatedCode = `${type}-${semester}-${subject.code}`

      const sanitizedType = validator.escape(type.toUpperCase() || "")
      if (!['UTS', 'UAS', 'UJIAN'].includes(sanitizedType)) {
        throw { name: 'Modified payload.' };
      }

      await Examination.create({
        type: sanitizedType,
        code: generatedCode,
        examinationDate: sanitizedExaminationDate,
        SubjectId: sanitizedSubjectId,
      });

      res.status(201).json({
        message: 'SubjectClass created successfully.',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editExamination(req, res, next) {
    try {
      const allowedFields = ['id', 'SubjectId', 'type', 'examinationDate'];
      const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
      if (extraFields.length > 0) {
        throw { name: 'Modified payload.' };
      }

      const { id, SubjectId, type, examinationDate } = req.body;

      if (!id || !SubjectId || !type || !examinationDate) {
        throw { name: 'Invalid input.' };
      }

      const sanitizedExaminationDate = validator.toDate(examinationDate || null);

      const sanitizedId = validator.escape(id || "")
      if (!validator.isUUID(sanitizedId)) {
        throw { name: 'Modified payload.' };
      }

      if (!sanitizedExaminationDate) {
        throw { name: 'Invalid date format.' };
      }

      const sanitizedSubjectId = validator.escape(SubjectId || "")
      if (!validator.isUUID(sanitizedSubjectId)) {
        throw { name: 'Modified payload.' };
      }

      const subject = await Subject.findOne({
        where: {
          id: sanitizedSubjectId
        }
      })

      if (!subject) {
        throw { name: 'Data not found.' };
      }

      const examMonth = sanitizedExaminationDate.getMonth() + 1;
      const semester = (examMonth >= 7 && examMonth <= 12) ? 'GANJIL' : 'GENAP';
      const generatedCode = `${type}-${semester}-${subject.code}`

      const sanitizedType = validator.escape(type.toUpperCase() || "")
      if (!['UTS', 'UAS', 'UJIAN'].includes(sanitizedType)) {
        throw { name: 'Modified payload.' };
      }

      const examination = await Examination.findOne({
        where: {
          id: sanitizedId
        }
      })

      if (!examination) {
        throw { name: 'Data not found.' };
      }

      await examination.update({
        type: sanitizedType,
        code: generatedCode,
        examinationDate: sanitizedExaminationDate,
        SubjectId: sanitizedSubjectId,
      });

      res.status(200).json({
        message: 'Subject updated successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteExamination(req, res, next) {
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

      const examination = await Examination.findOne({ where: { id: sanitizedId } });
      if (!examination) {
        throw { name: 'Data not found.' };
      }

      await examination.destroy();

      res.status(200).json({
        message: 'Subject deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QuestionController;
