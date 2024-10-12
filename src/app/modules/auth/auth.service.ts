import httpStatus from 'http-status'
import { User } from '../user/user.model'
import ApiError from '../../../errors/ApiError'
import { ILoginRegisterResponse, ILoginUser } from './auth.interface'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { IUser } from '../user/user.interface'

const loginUser = async (
  payload: ILoginUser,
): Promise<ILoginRegisterResponse> => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist')
  }

  // Match password
  const isPasswordMatched =
    isUserExist.password &&
    (await User.isPasswordMatched(password, isUserExist?.password))

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email or password incorrect')
  }

  // access token & refresh token
  const { _id, email: userEmail, role, name } = isUserExist

  const accessToken = jwtHelpers.createToken(
    {
      userId: _id,
      name: name,
      email: userEmail,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    {
      userId: _id,
      name: name,
      email: userEmail,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  const user = {
    email: isUserExist.email,
    name: isUserExist.name,
    avatar: isUserExist.avatar,
  }

  return {
    user,
    accessToken,
    refreshToken,
  }
}

const traineeRegister = async (
  payload: IUser,
): Promise<ILoginRegisterResponse> => {
  const existUser = await User.findOne({ email: payload.email })

  if (existUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User Already Exist')
  }

  const newUser = await User.create(payload)

  if (!newUser) {
    throw new ApiError(400, 'Failed to create user')
  }

  // access token & refresh token
  const { _id, email, role, name } = newUser

  const accessToken = jwtHelpers.createToken(
    {
      userId: _id,
      name,
      email,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    {
      userId: _id,
      name,
      email,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    user: newUser,
    accessToken,
    refreshToken,
  }
}

const myProfile = async (
  payload: Partial<IUser>,
): Promise<Partial<IUser> | null> => {
  const existUser = await User.findOne({ email: payload.email })

  return existUser
}

const updateMyProfile = async (
  payload: Partial<IUser>,
  updatedData: Partial<IUser>
): Promise<Partial<IUser> | null> => {
  const existUser = await User.findOne({ email: payload.email, role: payload.role });

  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile Not Found');
  }

  if (updatedData?.email) {
    delete updatedData.email;
  }

  if (updatedData?.password) {
    delete updatedData.password;
  }

  if (updatedData?.role) {
    delete updatedData.role;
  }

  const updatedUser = await User.findByIdAndUpdate({ _id: existUser?._id }, { ...updatedData }, { new: true });

  return updatedUser
}

export const AuthService = {
  loginUser,
  traineeRegister,
  myProfile,
  updateMyProfile,
}
