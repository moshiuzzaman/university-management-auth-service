import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/Logger';
import { Server } from 'http';
import { RedisClient } from './shared/redis';
import subscribeToEvents from './app/events';

process.on('uncaughtException', error => {
  errorLogger.error('error from uncaughtException ~', error);
  process.exit(1);
});

let server: Server;
const bootstrap = async () => {
  try {
    await RedisClient.connect().then(() => {
      subscribeToEvents();
    });
    await mongoose.connect(config.database_url as string);
    logger.info('✅ Database connect successfully');

    server = app.listen(config.port, () => {
      logger.info(`🏃‍♂️ Auth Server running on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('❌ Database connection failed');
  }
  process.on('unhandledRejection', error => {
    errorLogger.error('error from uncaughtException ~', error);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });
};
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
