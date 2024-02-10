import Fastify, { FastifyInstance } from 'fastify';
import { Bot } from './application';
import { PrismaRepository, RedisRepository } from './repositories';
import { ConfigService } from './services/config';

const app: FastifyInstance = Fastify({ logger: true });

const bot = new Bot(
	ConfigService.getInstance(),
	PrismaRepository.getInstance(),
	RedisRepository.getInstance(),
);

const webhook = bot.bot.createWebhook({
	domain: process.env.WEBHOOK_DOMAIN!,
});

//@ts-ignore
app.post(`/telegraf/${bot.bot.secretPathComponent()}`, webhook);

bot.init();

console.log(
	'Бот запущен',
	process.env.NODE_ENV === 'production' ? 'в продакшене' : 'в разработке',
);

app.listen({ port: 3000 }).then(() => console.log("Listening on port", 3000));