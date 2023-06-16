import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty; future a krte hbe
  // admin?: Types.ObjectId | IAdmin; future a krte hbe
};

export type UserModel = Model<IUser, Record<string, unknown>>;
