import config from '../../../config';
import { JwtHelpers } from '../../../helpers/jwtTokenHelpers';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // is user exist
  const isUserExist = await User.isUserExist(id);
  const needsPasswordChange = isUserExist?.needsPasswordChange as boolean;

  //   Match password
  await User.isPasswordMatched(password, isUserExist?.password as string);

  const jwtData = { userId: isUserExist?.id, role: isUserExist?.role };
  // create access and refresh token
  const accessToken = JwtHelpers.createToken(
    jwtData,
    config.jwt.jwt_secret,
    config.jwt.jwt_secret_expires_in
  );
  const refreshToken = JwtHelpers.createToken(
    jwtData,
    config.jwt.jwt_refresh_secret,
    config.jwt.jwt_refresh_secret_expires_in
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let verifiedUser = null;

  verifiedUser = JwtHelpers.verifyToken(token, config.jwt.jwt_refresh_secret);

  const isUserExist = await User.isUserExist(verifiedUser?.userId);

  const jwtData = { userId: isUserExist?.id, role: isUserExist?.role };
  const accessToken = JwtHelpers.createToken(
    jwtData,
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_secret_expires_in as string
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // is user exist
  const isUserExist = await User.findOne({ id: user.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist');
  }

  //   Match password
  await User.isPasswordMatched(oldPassword, isUserExist?.password as string);
  isUserExist.needsPasswordChange = false;
  isUserExist.password = newPassword;
  isUserExist.save();
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
};
