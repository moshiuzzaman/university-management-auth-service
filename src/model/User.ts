import { Schema, model } from 'mongoose';
import { IUserShared, UserSharedModel } from '../interfaces/IUser';
import { bloodGroup, gender } from '../constants/user';

export const UserSharedSchema = new Schema<IUserShared, UserSharedModel>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
      required: true,
    },

    profileImage: {
      type: String,
      //   required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const UserShared = model<IUserShared, UserSharedModel>(
  'UserShared',
  UserSharedSchema
);
