import httpStatus from 'http-status'
import { ICreateUserResponse, IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import ApiError from '../../../errors/ApiError'

const createTrainer = async (payload: IUser): Promise<ICreateUserResponse> => {
  const existUser = await User.findOne({ email: payload.email }).select("name email role avatar")

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

export const UserService = {
  createTrainer,
}
