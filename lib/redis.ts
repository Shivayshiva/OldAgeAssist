
import { Redis } from "ioredis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = url && token
  ? new Redis(url, {
      password: token,
      maxRetriesPerRequest: null,
    })
  : undefined;
