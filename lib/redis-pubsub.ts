import { Redis } from "ioredis";

export const pub = new Redis(process.env.UPSTASH_REDIS_REST_URL!);
export const sub = new Redis(process.env.UPSTASH_REDIS_REST_URL!);

