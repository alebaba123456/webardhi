const { Examination, Session, Question } = require('../../models');
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
    
            const session = await Session.findOne({
                where: { id: req.session.dataValues.id }
            });
    
            if (session.status) {
                throw { name: 'OnExamination.' };
            }
    
            const questions = await Question.findAll({
                where: { ExaminationId },
                attributes: ['id', 'question', 'type', 'option']
            });
    
            const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    
            const pilihanGanda = shuffleArray(questions.filter(q => q.type === 'Pilihan ganda'));
            const essai = shuffleArray(questions.filter(q => q.type === 'Esai'));
    
            const sortedQuestions = [...pilihanGanda, ...essai].map(q => ({
                ...q.toJSON(),
                answer: ""
            }));
    
            await session.update({
                status: true,
                examQuestion: JSON.stringify(sortedQuestions)
            });
    
            res.status(200).json({
                message: 'Examination started successfully'
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }    

    static async saveExamination(req, res, next) {
        try {
            const answers = req.body;
            if (!Array.isArray(answers)) {
                throw { name: 'InvalidPayload', message: 'Payload must be an array of answers.' };
            }
    
            const session = await Session.findOne({
                where: { id: req.session.dataValues.id }
            });
    
            if (!session || !session.examQuestion) {
                throw { name: 'SessionNotFound', message: 'Session not found or invalid.' };
            }
    
            const examQuestions = JSON.parse(session.examQuestion);
    
            const isValid = answers.every(answer =>
                examQuestions.some(question => question.id === answer.id)
            );
    
            if (!isValid) {
                throw { name: 'InvalidAnswer', message: 'Answer contains invalid question ID.' };
            }
    
            const updatedQuestions = examQuestions.map(question => {
                const matchingAnswer = answers.find(answer => answer.id === question.id);
                if (matchingAnswer) {
                    return { ...question, answer: matchingAnswer.answer || '' };
                }
                return question;
            });
    
            await session.update({
                examQuestion: JSON.stringify(updatedQuestions)
            });
            
            res.status(200).json({
                message: 'Answer saved.'
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    
    static async submitExamination(req, res, next) {
        try {
            const session = await Session.findOne({
                where: { id: req.session.dataValues.id }
            });

            if (!session || !session.examQuestion) {
                throw { name: 'SessionNotFound', message: 'Session not found or invalid.' };
            }

            const examQuestions = JSON.parse(session.examQuestion);

            let correctAnswers = 0;

            examQuestions.forEach(question => {
                if (question.type === 'Pilihan ganda' && question.answer === question.userAnswer) {
                    correctAnswers++;
                }
            });

            const score = Math.round((correctAnswers / examQuestions.length) * 100);

            // await session.update({
            //     status: false,
            //     score
            // });

            res.status(200).json({
                message: 'Examination submitted successfully.',
                score
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

module.exports = ExaminationSessionController
