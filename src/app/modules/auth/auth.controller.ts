import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'
import sendResponse from '../../../shared/sendResponse'
import { ICreateUserResponse } from './auth.interface'
import httpStatus from 'http-status'

const createTrainer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...userData } = req.body
    const result = await AuthService.createTrainer(userData)

    sendResponse<ICreateUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Created',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AuthController = {
  createTrainer,
}
