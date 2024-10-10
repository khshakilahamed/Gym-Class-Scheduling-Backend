import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ClassScheduleService } from "./classSchedule.service";
import { IClassSchedule } from "./classSchedule.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { classScheduleFilterableFields } from "./classSchedule.constant";

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

            const result = await ClassScheduleService.create(userData)

            sendResponse<IClassSchedule>(res, {
                  statusCode: httpStatus.CREATED,
                  success: true,
                  message: 'Successfully Created',
                  data: result,
            })
      } catch (error) {
            next(error)
      }
}

const findAllSchedules = async (
      req: Request,
      res: Response,
      next: NextFunction,
) => {
      try {
            const filters = pick(req.query, classScheduleFilterableFields);
            const paginationOptions = pick(req.query, paginationFields);

            const result = await ClassScheduleService.findAllSchedules(filters, paginationOptions)

            sendResponse<IClassSchedule[]>(res, {
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
            const result = await ClassScheduleService.findById(id);

            sendResponse<IClassSchedule>(res, {
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
            const result = await ClassScheduleService.updatedById(id, updatedData);

            sendResponse<IClassSchedule>(res, {
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
            const result = await ClassScheduleService.deleteById(id);

            sendResponse<IClassSchedule>(res, {
                  statusCode: httpStatus.OK,
                  success: true,
                  message: 'Successfully deleted',
                  data: result,
            })
      } catch (error) {
            next(error)
      }
}

export const ClassScheduleController = {
      create,
      findAllSchedules,
      findById,
      updatedById,
      deleteById
}