import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import config from '../../../config';
import bcrypt from 'bcrypt';

// i use static method
const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// if i use static method
userSchema.statics.isUserExist = async function (
  id,
  type = false
): Promise<Partial<IUser>> {
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
  if (!type && !isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist');
  }
  return isUserExist as Partial<IUser>;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password');
  }
  return isPasswordMatched;
};

userSchema.pre('save', async function (next) {
  // password hashing
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_Salt_Rounds)
  );

  if (!this.needsPasswordChange) {
    this.passwordChangedAt = new Date();
  }

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
