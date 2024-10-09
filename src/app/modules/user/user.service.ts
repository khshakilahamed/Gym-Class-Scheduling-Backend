import httpStatus from 'http-status'
import { ICreateUserResponse, IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import ApiError from '../../../errors/ApiError'
import { ENUM_USER_ROLE } from '../../../enums/user'

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

const updateUser = async (id: string, updatedData: Partial<IUser>): Promise<IUser> => {
  const existUser = await User.findById(id);

  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (existUser.role !== ENUM_USER_ROLE.TRAINER) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You can not update this user profile');
  }

  if (updatedData.password) {
    delete updatedData.password;
  }

  const updatedUser = await User.findByIdAndUpdate({ _id: existUser._id }, { ...updatedData }, { new: true })

  return updatedUser!
}

export const UserService = {
  createTrainer,
  updateUser,
}
