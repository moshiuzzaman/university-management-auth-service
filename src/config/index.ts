/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASSWORD,
}
