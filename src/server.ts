import mongoose from 'mongoose'
import app from './app'
import config from './config'

const bootstrap = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string)
    // console.log('✅ Database connect successfully')

    app.listen(config.port, () => {
      // console.log(`🏃‍♂️  App listening on port ${config.port}`)
    })
  } catch (error) {
    // console.log('❌ Database connection faild')
  }
}
bootstrap()
