const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

async function checkAnswerWithAI(question, trueAnswer, answer) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Saya memiliki pertanyaan: "${question}".
    Jawaban yang benar adalah: "${trueAnswer}".
    Apakah jawaban berikut memiliki arti yang sama dengan jawaban benar?: "${answer}"
    Jawab hanya dengan "YA" atau "TIDAK".`;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        // const responseText = result.response.text().trim().toUpperCase();
        // return responseText.includes("YA");

        return result.response
    } catch (error) {
        throw { name : 'FailedToConnect.'}
    }
}

module.exports = { checkAnswerWithAI };
