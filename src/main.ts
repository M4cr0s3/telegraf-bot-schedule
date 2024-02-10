// import { Context, Markup, Telegraf } from 'telegraf';
// import { config } from 'dotenv';
// import { PrismaRepository } from './services';
// import { CronJob } from 'cron';
// import { CreateUserDto } from './DTO';
// import axios from 'axios';
// import { ReshaloResponse } from './types/types';
// import { makeAnswer } from './utils';
// config();

import { Bot } from './application';
import { PrismaRepository } from './repository';
import { ConfigService } from './services/config';

// import { bot } from "./application";

// export const bot = new Telegraf(process.env.BOT_TOKEN!);
// const prismaRepository = new PrismaRepository();

// new CronJob(
// 	'* 14 * * *',
// 	async () => {
// 		const users = await prismaRepository.getAll();
// 		users.forEach((user) => {
// 			bot.telegram.sendMessage(user.userId, 'Hello, ' + user.userId);
// 		});
// 	},
// 	null,
// 	true,
// );

// bot.start(async function (ctx) {
// 	await prismaRepository.create(
// 		new CreateUserDto(ctx.from.id, ctx.from.first_name, ctx.from.last_name),
// 	);

// 	await ctx.reply(
// 		`Hello, ${ctx.from.first_name} ${ctx.from?.last_name ? ctx.from.last_name : ''}`,
// 	);
// });

// bot.command('rasp', async (ctx: Context) => {
// 	const chatId = String(ctx?.chat?.id);

// 	try {
		// const todayDate = Math.floor(new Date().getTime() / 1000);
		// const response = await axios.get<ReshaloResponse>(
		// 	`https://api.it-reshalo.ru//schedule?filter=41&type=group&date=${todayDate}`,
		// );
		// const todaySchedule = response.data.result.final.reverse();

		// let answer = '';

		// answer = makeAnswer(todaySchedule);

		// await ctx.telegram.sendMessage(chatId, answer);
// 	} catch (error) {}
// });

// bot.hears('settings', async (ctx: Context) => {
// 	const chatId = ctx?.chat?.id;

// 	const keyboard = Markup.inlineKeyboard([
// 		Markup.button.callback(
// 			'Установить время отправки расписания.',
// 			'set_time',
// 		),
// 	]);

// 	await ctx.telegram.sendMessage(
// 		String(chatId),
// 		'🛠️ Изменение настроек.',
// 		keyboard,
// 	);
// });

// bot.action('set_time', async (ctx: Context) => {
// 	const chatId = ctx?.chat?.id;
// 	await ctx.telegram.sendMessage(
// 		String(chatId),
// 		'⏰ Введите время в формате ЧЧ:ММ.',
// 		Markup.removeKeyboard(),
// 	);
// });

// bot.hears(/[0-1][0-9]:[0-5][0-9]|2[0-3]:[0-5][0-9]/, async (ctx: Context) => {
//     const chatId = ctx?.chat?.id;

//     await ctx.telegram.sendMessage(
//         String(chatId),
//         '📅 Вы ввели норм время',
//     )
// })


const bot = new Bot(
	ConfigService.getInstance(),
	PrismaRepository.getInstance(),
);
bot.init();
