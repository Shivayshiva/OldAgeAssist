
import { Redis } from "ioredis";

const url = process.env.REDIS_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const pub = url && token
	? new Redis(url, { password: token })
	: undefined;
export const sub = url && token
	? new Redis(url, { password: token })
	: undefined;

