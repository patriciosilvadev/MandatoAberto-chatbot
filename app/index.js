require('dotenv').config();

const { MessengerBot, FileSessionStore } = require('bottender');
const { createServer } = require('bottender/restify');
const MandatoAbertoAPI = require('./mandatoaberto_api.js');
const config = require('./bottender.config.js').messenger;

const mapPageToAccessToken = (async pageId => {
	function callback (accessToken) {
		return accessToken;
	}

	const accessToken = await MandatoAbertoAPI.getPoliticianData(pageId);

	return accessToken;
});

const bot = new MessengerBot({
	mapPageToAccessToken,
	appSecret: config.appSecret,
	sessionStore: new FileSessionStore(),
});

bot.onEvent(async context => {
	await context.sendText('foobar');
});

const server = createServer(bot, { verifyToken: config.verifyToken } );

server.listen(process.env.API_PORT, () => {
	console.log(`server is running on ${process.env.API_PORT} port...`);
});
