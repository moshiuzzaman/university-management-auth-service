import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/Logger';
import { Server } from 'http';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', error => {
  errorLogger.error('error from uncaughtException ~', error);
  process.exit(1);
});

let server: Server;
const bootstrap = async () => {
  try {
    await RedisClient.connect();
    await mongoose.connect(config.database_url as string);
    logger.info('✅ Database connect successfully');

    server = app.listen(config.port, () => {
      logger.info(`🏃‍♂️  App listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('❌ Database connection faild');
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
  logger.info('SIGTERM is recived');
  if (server) {
    server.close();
  }
});
