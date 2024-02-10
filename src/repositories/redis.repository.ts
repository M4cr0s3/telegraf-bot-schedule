import { ConfigService, IConfigService } from '../services/config';
import { ICacheRepository } from './';
import { Redis } from 'ioredis';

export class RedisRepository implements ICacheRepository {
	private static _instance: ICacheRepository;
	private _redis: Redis;
	constructor(private readonly configService: IConfigService) {
		this._redis = new Redis({
			host: configService.get('REDIS_HOST'),
			port: +configService.get('REDIS_PORT'),
		});
	}

	public static getInstance(): ICacheRepository {
		if (!RedisRepository._instance) {
			RedisRepository._instance = new RedisRepository(
				ConfigService.getInstance(),
			);
		}
		return RedisRepository._instance;
	}

	public async get(key: string): Promise<any | null> {
		return await this._redis.get(key);
	}
	public async set(key: string, time: number, value: string): Promise<void> {
		await this._redis.setex(key, time, value);
	}
}
