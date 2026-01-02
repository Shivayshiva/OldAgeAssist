
import { Redis } from "ioredis";

let redis: Redis | undefined;

if (process.env.REDIS_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  // Upstash connection
  redis = new Redis(process.env.REDIS_URL, {
    password: process.env.UPSTASH_REDIS_REST_TOKEN,
    maxRetriesPerRequest: null,
  });
} else if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  // Local Redis connection
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD, // optional
  });
} else {
  redis = undefined;
}

export { redis };
