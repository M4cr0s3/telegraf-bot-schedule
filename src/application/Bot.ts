import { Telegraf } from 'telegraf';
import { IConfigService } from '../services/config';
import { Command, ScheduleCommand, StartCommand } from '../commands';
import { PrismaRepository } from '../repository';
import { CronJob } from 'cron';
import { makeAnswer } from '../utils';
import { ReshaloResponse } from '../types/types';
import axios from 'axios';

export class Bot {
	public bot: Telegraf;
	public commands: Command[] = [];

	constructor(
		private readonly configService: IConfigService,
		private readonly prismaRepository: PrismaRepository,
	) {
		this.bot = new Telegraf(this.configService.get('BOT_TOKEN'));
	}

	public async init() {
		this.commands = [
			new StartCommand(this.bot, this.prismaRepository),
			new ScheduleCommand(this.bot),
		];
		for (const command of this.commands) {
			command.execute();
		}

		// new CronJob(
		// 	'* * * * *',
		// 	async () => {
		// 		await this.notificateAllUsers();
		// 	},
		// 	null,
		// 	true,
		// 	'Europe/Moscow',
		// );

		await this.bot.launch();
	}

	public async notificateAllUsers() {
		const users = await this.prismaRepository.getAll();

		for (const user of users) {
			try {
				const todayDate = Math.floor(new Date().getTime() / 1000);
				const response = await axios.get<ReshaloResponse>(
					`https://api.it-reshalo.ru//schedule?filter=41&type=group&date=${todayDate}`,
				);
				const todaySchedule = response.data.result.final.reverse();

				let answer = '';

				answer = makeAnswer(todaySchedule, todayDate);

				await this.bot.telegram.sendMessage(user.userId, answer);
			} catch (error) {
				console.log(error);
			}
		}
	}
}
