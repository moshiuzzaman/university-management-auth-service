import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtHelpers } from '../../helpers/jwtTokenHelpers';
import config from '../../config';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          '🥱 You are not authoriged.'
        );
      }

      // verify token
      const verifiedUser = JwtHelpers.verifyToken(token, config.jwt.jwt_secret);

      req.user = verifiedUser;

      // role guard
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, '🔑Forbidden🔑');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
