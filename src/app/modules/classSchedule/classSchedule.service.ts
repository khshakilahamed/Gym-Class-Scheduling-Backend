import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { TimeSlot } from "../timeSlot/timeSlot.model";
import { IClassSchedule, IClassScheduleFilters } from "./classSchedule.interface";
import { ClassSchedule } from "./classSchedule.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { SortOrder, Types } from "mongoose";
import { classScheduleSearchableFields } from "./classSchedule.constant";
import { convertTimeSlotToHour } from "./classSchedule.utils";

const create = async (payload: IClassSchedule): Promise<IClassSchedule> => {
      const isExistSameSlotAndDate = await ClassSchedule.findOne({ day: payload.day, timeSlotId: payload.timeSlotId }).populate("timeSlotId");

      if (isExistSameSlotAndDate) {
            throw new ApiError(httpStatus.CONFLICT, `This provided time slot already exist on ${payload.day}`);
      }

      const isExist = await ClassSchedule.find({ day: payload.day });
      if (isExist.length >= 5) {
            throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Maximum 5 schedules can be created in a day');
      }

      const timeSlot = await TimeSlot.findById({ _id: payload.timeSlotId });

      if (!timeSlot) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Time slot not found');
      }

      // get hour
      const differenceInHours = convertTimeSlotToHour(timeSlot);
      payload.duration = differenceInHours;

      // Return the new class schedule (uncomment when needed)
      const newClassSchedule = await (await ClassSchedule.create(payload)).populate(['trainers', 'createdBy', 'updatedBy']);

      if (!newClassSchedule) {
            throw new ApiError(400, 'Failed to create class schedule');
      }

      return newClassSchedule;
}

const findAllSchedules = async (
      filters: IClassScheduleFilters,
      paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IClassSchedule[]>> => {
      const { searchTerm, ...filtersData } = filters;

      const { page, limit, skip, sortBy, sortOrder } =
            paginationHelpers.calculatePagination(paginationOptions);

      const andConditions = [];

      if (searchTerm) {
            andConditions.push({
                  $or: classScheduleSearchableFields.map((field) => ({
                        [field]: {
                              $regex: searchTerm,
                              $options: 'i',
                        },
                  })),
            });
      }

      if (Object.keys(filtersData).length) {
            andConditions.push({
                  $and: Object.entries(filtersData).map(([field, value]) => ({
                        [field]: value,
                  })),
            });
      }

      const whereCondition =
            andConditions.length > 0 ? { $and: andConditions } : {};

      const sortConditions: { [key: string]: SortOrder } = {};

      if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
      }

      const result = await ClassSchedule.find(whereCondition)
            .populate(['trainers', 'timeSlotId'])
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);

      const total = await ClassSchedule.countDocuments();

      return {
            meta: {
                  page,
                  limit,
                  total,
            },
            data: result,
      };;
}

const trainerSchedules = async (id: string) => {
      const trainerObjectId = new Types.ObjectId(id);
      const schedules = await ClassSchedule.find({ trainers: trainerObjectId });
      // const trainerId: Types.ObjectId = new Types.ObjectId(id);
      // const mySchedules = schedules.map(schedule => schedule.trainers.includes(trainerId));

      // console.log(schedules);
      return schedules;
}

const findById = async (id: string): Promise<IClassSchedule> => {
      const classSchedule = await ClassSchedule.findById(id).populate(['trainers', 'timeSlotId']);

      if (!classSchedule) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Class schedule does not found');
      }

      return classSchedule;
}

const updatedById = async (id: string, payload: Partial<IClassSchedule>): Promise<IClassSchedule | null> => {
      const isExist = await ClassSchedule.findById(id);

      if (!isExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Class schedule does not Exist');
      }

      if (payload.timeSlotId) {
            const timeSlot = await TimeSlot.findById({ _id: payload.timeSlotId });
            // get hour
            const differenceInHours = timeSlot && convertTimeSlotToHour(timeSlot);
            payload.duration = differenceInHours ? differenceInHours : 2;
      }

      const updatedTimeSlot = await ClassSchedule.findByIdAndUpdate({ _id: id }, { ...payload }, { new: true });

      return updatedTimeSlot;
}

const deleteById = async (id: string): Promise<IClassSchedule | null> => {
      const isExist = await ClassSchedule.findById(id);

      if (!isExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Time slot does not Exist');
      }

      const deletedClassSchedule = await ClassSchedule.findByIdAndDelete(id);

      return deletedClassSchedule;
}

export const ClassScheduleService = {
      create,
      findAllSchedules,
      trainerSchedules,
      findById,
      updatedById,
      deleteById,
}