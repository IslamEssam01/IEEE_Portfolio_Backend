import { Module } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        const redis = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
          retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
        });

        return new Promise((resolve, reject) => {
          redis.on('connect', () => {
            console.log('✓ Redis connected');
            resolve(redis);
          });

          redis.on('error', (err) => {
            console.error('✗ Redis connection error:', err.message);
            reject(err);
          });

          // Timeout after 5 seconds
          setTimeout(() => reject(new Error('Redis connection timeout')), 5000);
        });
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
