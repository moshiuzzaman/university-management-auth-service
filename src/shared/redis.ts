import { createClient } from '@redis/client';
import config from '../config';
import { SetOptions } from 'redis';

const redisClient = createClient({
  url: config.redis.url,
});

const redisPublishClient = createClient({
  url: config.redis.url,
});

const redisSubscribeClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', error => {
  console.log('redisClient error', error);
});

redisClient.on('connect', () => {
  console.log('redisClient connected');
});

const connect = async () => {
  await redisClient.connect();
  await redisPublishClient.connect();
  await redisSubscribeClient.connect();
};

const set = async (
  key: string,
  value: string,
  options?: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, options);
};

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

const setAccessToken = async (key: string, value: string): Promise<void> => {
  await redisClient.set(`access_token:${key}`, value, {
    EX: Number(config.redis.expires_in),
  });
};

const getAccessToken = async (key: string): Promise<string | null> => {
  return await redisClient.get(`access_token:${key}`);
};

const delAccessToken = async (key: string): Promise<void> => {
  await redisClient.del(`access_token:${key}`);
};

const disconnect = async () => {
  redisClient.quit();
  redisPublishClient.quit();
  redisSubscribeClient.quit();
};

export const RedisClient = {
  connect,
  disconnect,
  set,
  get,
  del,
  setAccessToken,
  getAccessToken,
  delAccessToken,
  publish: redisPublishClient.publish.bind(redisPublishClient),
  subscribe: redisSubscribeClient.subscribe.bind(redisSubscribeClient),
};
