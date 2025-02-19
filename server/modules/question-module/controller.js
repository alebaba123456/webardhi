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

      let questionWhereClause = {};
      let examWhereClause = {};

      if (req.query.category) {
        const sanitizedCategory = validator.escape(req.query.category || "");

        if (!['ExaminationId', 'type'].includes(sanitizedCategory)) {
          throw { name: 'Modified payload.' };
        }

        if (req.query.keyword) {
          const sanitizedKeyword = validator.escape(req.query.keyword || "");

          if (sanitizedCategory === 'type') {
            const [fieldType] = await Examination.sequelize.query(`
                  SELECT data_type 
                  FROM information_schema.columns 
                  WHERE table_name = 'Questions' AND column_name = '${sanitizedCategory}'
                `);

            if (!fieldType || !fieldType.length) {
              throw { name: 'Invalid category.' };
            }

            const dataType = fieldType[0].data_type;
            const isStringField = ['character varying', 'text'].includes(dataType);

            if (isStringField) {
              questionWhereClause[sanitizedCategory] = { [Op.iLike]: `%${sanitizedKeyword}%` };
            } else if (dataType === 'integer') {
              const keywordAsInt = parseInt(sanitizedKeyword, 10);
              if (isNaN(keywordAsInt)) {
                throw { name: 'Invalid keyword for integer field.' };
              }
              questionWhereClause[sanitizedCategory] = keywordAsInt;
            } else if (dataType === 'uuid') {
              if (!validator.isUUID(sanitizedKeyword)) {
                throw { name: 'Modified payload.' };
              }
              questionWhereClause[sanitizedCategory] = sanitizedKeyword;
            } else {
              throw { name: 'Unsupported field type.' };
            }
          }

          else if (sanitizedCategory === 'ExaminationId') {
            if (!validator.isUUID(sanitizedKeyword)) {
              throw { name: 'Modified payload.' };
            }
            examWhereClause.id = sanitizedKeyword;
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

      const question = await Question.findAll({
        where: questionWhereClause,
        order: orderClause,
        offset,
        limit,
        include: [
          {
            model: Examination,
            where: Object.keys(examWhereClause).length ? examWhereClause : undefined,
            attributes: ['id', 'code']
          }
        ]
      });

      const totalQuestion = await Question.count({
        where: questionWhereClause,
        include: [
          {
            model: Examination,
            where: Object.keys(examWhereClause).length ? examWhereClause : undefined,
          }
        ]
      });
      res.status(200).json({
        message: 'Examination data retrieved successfully.',
        data: question,
        totalData: Math.ceil(totalQuestion / sanitizedSize),
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

      const sanitizedQuestion = validator.escape(question || "");
      const sanitizedAnswer = validator.escape(answer || "");
      const sanitizedType = validator.escape(type || "");
      if (!['Pilihan ganda', 'Esai'].includes(sanitizedType)) {
        throw { name: 'Modified payload.' };
      }
      let sanitizedOption = null;
      if (sanitizedType === 'Pilihan ganda') {
        if (!option || !Array.isArray(option) || option.length === 0) {
          throw { name: 'Modified payload.' };
        }
        sanitizedOption = option.map(item => validator.escape(String(item)));
      } else if (sanitizedType === 'Esai') {
        sanitizedOption = null;
      }

      await Question.create({
        ExaminationId: sanitizedExaminationId,
        question: sanitizedQuestion,
        answer: sanitizedAnswer,
        type: sanitizedType,
        option: sanitizedOption
      });

      res.status(201).json({
        message: 'Question created successfully.',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editQuestion(req, res, next) {
    try {
      const allowedFields = ['id', 'ExaminationId', 'question', 'answer', 'option', 'type'];
      const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
      if (extraFields.length > 0) {
        throw { name: 'Modified payload.' };
      }

      const { id, ExaminationId, question, answer, option, type } = req.body;

      // Validasi ID pertanyaan
      const sanitizedId = validator.escape(id || "");
      if (!validator.isUUID(sanitizedId)) {
        throw { name: 'Modified payload.' };
      }

      // Validasi ExaminationId
      const sanitizedExaminationId = validator.escape(ExaminationId || "");
      if (!validator.isUUID(sanitizedExaminationId)) {
        throw { name: 'Modified payload.' };
      }

      // Cek apakah ExaminationId valid
      const subject = await Examination.findOne({ where: { id: sanitizedExaminationId } });
      if (!subject) {
        throw { name: 'Data not found.' };
      }

      // Validasi dan sanitasi input lainnya
      const sanitizedQuestion = validator.escape(question || "");
      const sanitizedAnswer = validator.escape(answer || "");
      const sanitizedType = validator.escape(type || "");
      if (!['Pilihan ganda', 'Esai'].includes(sanitizedType)) {
        throw { name: 'Modified payload.' };
      }

      let sanitizedOption = null;
      if (sanitizedType === 'Pilihan ganda') {
        if (!option || !Array.isArray(option) || option.length === 0) {
          throw { name: 'Modified payload.' };
        }
        sanitizedOption = option.map(item => validator.escape(String(item)));
      } else if (sanitizedType === 'Esai') {
        sanitizedOption = null;
      }

      // Cek apakah pertanyaan dengan ID tersebut ada
      const questionData = await Question.findOne({ where: { id: sanitizedId } });
      if (!questionData) {
        throw { name: 'Data not found.' };
      }

      // Update pertanyaan
      await questionData.update({
        ExaminationId: sanitizedExaminationId,
        question: sanitizedQuestion,
        answer: sanitizedAnswer,
        type: sanitizedType,
        option: sanitizedOption
      });

      res.status(200).json({
        message: 'Question updated successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteQuestion(req, res, next) {
    try {
      const allowedFields = ['id'];
      const extraFields = Object.keys(req.params).filter(key => !allowedFields.includes(key));
      if (extraFields.length > 0) {
        throw { name: 'Modified payload.' };
      }

      const { id } = req.params;
      const sanitizedId = validator.escape(id || "");
      if (!validator.isUUID(sanitizedId)) {
        throw { name: 'Modified payload.' };
      }

      // Cek apakah pertanyaan ada di database
      const question = await Question.findOne({ where: { id: sanitizedId } });
      if (!question) {
        throw { name: 'Data not found.' };
      }

      // Hapus pertanyaan dari database
      await question.destroy();

      res.status(200).json({
        message: 'Question deleted successfully.'
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = QuestionController;
