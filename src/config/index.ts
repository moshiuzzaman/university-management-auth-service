import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const env = process.env;

export default {
  env: env.NODE_ENV,
  port: env.PORT,
  database_url: env.DATABASE_URL,
  default_student_pass: env.DEFAULT_STUDENT_PASSWORD,
  default_Faculty_pass: env.DEFAULT_STUDENT_PASSWORD,
  default_Admin_pass: env.DEFAULT_STUDENT_PASSWORD,
  bcrypt_Salt_Rounds: env.BCRYPT_SALT_ROUNDS as string | number,
  jwt: {
    jwt_secret: env.JWT_SECRET as Secret,
    jwt_secret_expires_in: env.JWT_SECRET_EXPIRES_IN as string,
    jwt_refresh_secret: env.JWT_REFRESH_SECRET as Secret,
    jwt_refresh_secret_expires_in: env.JWT_REFRESH_SECRET_EXPIRES_IN as string,
  },
};
