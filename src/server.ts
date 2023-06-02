import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/Logger'

const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('✅ Database connect successfully')

    app.listen(config.port, () => {
      logger.info(`🏃‍♂️  App listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('❌ Database connection faild')
  }
}
bootstrap()
