import { NextFunction, Request, Response } from "express"
import { TimeSlotService } from "./timeSlot.service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { ITimeSlot } from "./timeSlot.interface"
import { JwtPayload } from "jsonwebtoken"

const create = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const user: JwtPayload | null = req.user;
            const userData = req.body
            userData['createdBy'] = user!.userId;
            userData['updatedBy'] = user!.userId;

            const result = await TimeSlotService.create(userData)

            sendResponse<ITimeSlot>(res, {
                  statusCode: httpStatus.CREATED,
                  success: true,
                  message: 'Successfully Created',
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
            const result = await TimeSlotService.findAll()

            sendResponse<ITimeSlot[]>(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Successfully retrieved',
                  data: result,
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
            const result = await TimeSlotService.findById(id);

            sendResponse<ITimeSlot>(res, {
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
            const user = req.user;
            const updatedData = req.body;
            updatedData['updatedBy'] = user?.userId;
            const result = await TimeSlotService.updatedById(id, updatedData);

            sendResponse<ITimeSlot>(res, {
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
            const result = await TimeSlotService.deleteById(id);

            sendResponse<ITimeSlot>(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Successfully deleted',
                  data: result,
            })
      } catch (error) {
            next(error)
      }
}

export const TimeSlotController = {
      create,
      findById,
      findAll,
      updatedById,
      deleteById
}