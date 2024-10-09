import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'
import sendResponse from '../../../shared/sendResponse'
import { ILoginRegisterResponse } from './auth.interface'
import httpStatus from 'http-status'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body

    if (!userData.email) {
      throw new ApiError(400, 'Email required')
    }
    if (!userData.password) {
      throw new ApiError(400, 'Password required')
    }

    const result = await AuthService.loginUser(userData)

    const { refreshToken, ...otherResult } = result

    // set refresh token
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendResponse<ILoginRegisterResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully logged in',
      data: otherResult,
    })
  } catch (error) {
    next(error)
  }
}

const traineeRegister = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...userData } = req.body
    const result = await AuthService.traineeRegister(userData)

    const { refreshToken, ...otherResult } = result

    // set refresh token
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendResponse<ILoginRegisterResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully registered',
      data: otherResult,
    })
  } catch (error) {
    next(error)
  }
}

export const AuthController = {
  loginUser,
  traineeRegister,
}
