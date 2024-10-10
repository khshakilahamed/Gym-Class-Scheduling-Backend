import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { UserService } from './user.service'
import { ICreateUserResponse, IUser } from './user.interface'
import pick from '../../../shared/pick'
import { userFilterableFields } from './user.constant'
import { paginationFields } from '../../../constants/pagination'

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

const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UserService.findAllUsers(filters, paginationOptions)

    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully retrieved',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await UserService.updateUser(id, updatedData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Created',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createTrainer,
  findAllUsers,
  updateUser
}
