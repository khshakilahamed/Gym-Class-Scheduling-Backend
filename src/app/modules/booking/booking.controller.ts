import { NextFunction, Request, Response } from "express"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { JwtPayload } from "jsonwebtoken"
import { BookingService } from "./booking.service"
import { IBooking } from "./booking.interface"
import { bookingFilterableFields } from "./booking.constant"
import pick from "../../../shared/pick"
import { paginationFields } from "../../../constants/pagination"

const create = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const user: JwtPayload | null = req.user;
            const userData = req.body
            userData['userId'] = user!.userId;

            const result = await BookingService.create(userData)

            sendResponse<IBooking>(res, {
                  statusCode: httpStatus.CREATED,
                  success: true,
                  message: 'Successfully Booked',
                  data: result,
            })
      } catch (error) {
            next(error)
      }
}

const findAll = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const filters = pick(req.query, bookingFilterableFields);
            const paginationOptions = pick(req.query, paginationFields);

            const result = await BookingService.findAll(filters, paginationOptions)

            sendResponse<IBooking[]>(res, {
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

const myBookings = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const user = req.user;
            const userId = user?.userId;
            const paginationOptions = pick(req.query, paginationFields);

            const result = await BookingService.myBookings(userId, paginationOptions)

            sendResponse<IBooking[]>(res, {
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

const findById = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const { id } = req.params;
            const result = await BookingService.findById(id);

            sendResponse<IBooking>(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Successfully retrieved',
                  data: result,
            })
      } catch (error) {
            next(error)
      }
}

const updatedById = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const { id } = req.params;
            const updatedData = req.body;

            const result = await BookingService.updatedById(id, updatedData);

            sendResponse<IBooking>(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Successfully updated',
                  data: result,
            })
      } catch (error) {
            next(error)
      }
}

const cancelById = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const user = req?.user;
            const { id } = req.params;
            const updatedData = req.body;
            updatedData["userId"] = user?.userId

            const result = await BookingService.cancelById(id, updatedData);

            sendResponse<IBooking>(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Successfully updated',
                  data: result,
            })
      } catch (error) {
            next(error)
      }
}

const deleteById = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const { id } = req.params;
            const result = await BookingService.deleteById(id);

            sendResponse<IBooking>(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Successfully deleted',
                  data: result,
            })
      } catch (error) {
            next(error)
      }
}

export const BookingController = {
      create,
      findById,
      findAll,
      myBookings,
      updatedById,
      cancelById,
      deleteById
}