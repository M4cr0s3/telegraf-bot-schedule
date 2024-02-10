import { Bot } from './application';
import { PrismaRepository, RedisRepository } from './repositories';
import { ConfigService } from './services/config';

const bot = new Bot(
	ConfigService.getInstance(),
	PrismaRepository.getInstance(),
	RedisRepository.getInstance(),
);

bot.init();
console.log(
	'Бот запущен',
	process.env.NODE_ENV === 'production' ? 'в продакшене' : 'в разработке',
);
