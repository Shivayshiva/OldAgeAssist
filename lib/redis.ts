import IORedis from "ioredis";

export const redisConnection = new IORedis({
  host: process.env.UPSTASH_REDIS_REST_URL!,
  port: Number(process.env.UPSTASH_REDIS_REST_TOKEN!),
  maxRetriesPerRequest: null,
});
