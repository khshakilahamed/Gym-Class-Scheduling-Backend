import httpStatus from 'http-status'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import ApiError from '../../../errors/ApiError'
import { ICreateUserResponse } from './auth.interface'

const createTrainer = async (payload: IUser): Promise<ICreateUserResponse> => {
  const existUser = await User.findOne({ email: payload.email })

  if (existUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User Already Exist')
  }

  const newUser = await User.create(payload)

  if (!newUser) {
    throw new ApiError(400, 'Failed to create user')
  }

  return {
    user: newUser,
  }
}

export const AuthService = {
  createTrainer,
}
