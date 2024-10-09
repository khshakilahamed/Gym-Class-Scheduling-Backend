import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { UserService } from './user.service'
import { ICreateUserResponse } from './user.interface'

const createTrainer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...userData } = req.body
    const result = await UserService.createTrainer(userData)

    sendResponse<ICreateUserResponse>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Successfully Created',
      data: { ...result },
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createTrainer,
}
