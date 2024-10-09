import { Model, ObjectId } from 'mongoose'

export type IUser = {
  _id?: ObjectId
  name: string
  email: string
  password: string
  avatar?: string
  role: string
}

export type UserModel = {
  isUserExist(email: string): Promise<IUser>

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>

export type ICreateUserResponse = {
    user: Partial<IUser>
  }
