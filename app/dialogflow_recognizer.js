const DialogFlow = require('apiai');

const app = DialogFlow(process.env.DIALOGFLOW_TOKEN);

module.exports = {
    recognize: (context, callback) => {
        const request = app.textRequest(context.message.text, {
            sessionId: Math.random()
        });

        request.on('response', (response) => {
            const result = response.result;

            callback(null, {
                intent: result.metadata.intentName,
                score: result.score
            });
        });

        request.on('error', (error) => {
            callback(error);
        });

        request.end();
    }
};