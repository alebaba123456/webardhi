const { ScoreReport, Session, Question } = require('../../models');
const math = require('mathjs');
const stringSimilarity = require('string-similarity');
const he = require('he');

class ExaminationSessionController {
    static async startExamination(req, res, next) {
        try {
            const allowedFields = ['ExaminationId'];
            const extraFields = Object.keys(req.body).filter(key => !allowedFields.includes(key));
            if (extraFields.length > 0) {
                throw { name: 'InvalidQuery', message: `Invalid query fields: ${extraFields.join(', ')}` };
            }

            const { ExaminationId } = req.body;
            const takenExamination = await ScoreReport.findOne({
                where: {
                    ExaminationId
                }
            })

            if (takenExamination) {
                throw { name: 'ExaminationTaken.' };
            }

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

    static evaluateMath(expression) {
        try {
            const decodedExpression = he.decode(expression);
            return Number(math.evaluate(decodedExpression));
        } catch (error) {
            return null;
        }
    }

    static compareMathAnswer(userAnswer, correctAnswer) {
        const userResult = ExaminationSessionController.evaluateMath(userAnswer);
        const correctResult = ExaminationSessionController.evaluateMath(correctAnswer);
        
        return userResult !== null && correctResult !== null && Math.abs(Number(userResult) - Number(correctResult)) < 0.1;
    }

    static compareTextAnswer(userAnswer, correctAnswer) {
        return stringSimilarity.compareTwoStrings(userAnswer.trim().toLowerCase(), correctAnswer.trim().toLowerCase()) > 0.85;
    }

    static async submitExamination(req, res, next) {
        try {
            const sessionId = req.session?.dataValues?.id;
            const profileId = req.session?.dataValues?.User?.ProfileId;
    
            if (!sessionId || !profileId) {
                throw { name: 'Forbidden.' };
            }
    
            const session = await Session.findOne({
                where: { id: sessionId }
            });
    
            if (!session || !session.examQuestion) {
                throw { name: 'Not found.' };
            }
    
            const examQuestions = JSON.parse(session.examQuestion);
    
            if (!Array.isArray(examQuestions) || examQuestions.length === 0) {
                throw { name: 'Modified payload.' };
            }
    
            const questionIds = examQuestions.map(q => q.id);
            const questions = await Question.findAll({
                where: { id: questionIds }
            });
    
            if (questions.length !== examQuestions.length) {
                throw { name: 'Modified payload.' };
            }
    
            const examinationIds = [...new Set(questions.map(q => q.ExaminationId))];
            if (examinationIds.length !== 1) {
                throw { name: 'Modified payload.' };
            }
    
            const examinationId = examinationIds[0];
    
            let correctAnswers = 0;
    
            for (const question of examQuestions) {
                const questionData = questions.find(q => q.id === question.id);
    
                if (!questionData) continue;
    
                if (questionData.type === 'Pilihan ganda' && question.answer === questionData.answer) {
                    correctAnswers++;
                } else if (questionData.type === 'Esai') {
                    if (ExaminationSessionController.compareMathAnswer(question.answer, questionData.answer) ||
                        ExaminationSessionController.compareTextAnswer(question.answer, questionData.answer)) {
                        correctAnswers++;
                    }
                }
            }
    
            const score = Math.round((correctAnswers / examQuestions.length) * 100);

            await ScoreReport.create({
                ProfileId: profileId,
                ExaminationId: examinationId,
                score
            });
    
            await session.update({
                status: false,
                examQuestion: null
            });
    
            res.status(200).json({
                message: 'Examination submitted successfully.',
            });
        } catch (error) {
            console.log(error);
            
            next(error);
        }
    }
    
    
}

module.exports = ExaminationSessionController;