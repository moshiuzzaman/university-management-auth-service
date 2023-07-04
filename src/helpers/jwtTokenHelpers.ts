import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';

export const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  let verifiedUser;
  try {
    verifiedUser = jwt.verify(token, secret);
  } catch (err) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, '❌ Invalid token');
  }
  return verifiedUser as JwtPayload;
};

export const JwtHelpers = {
  createToken,
  verifyToken,
};
