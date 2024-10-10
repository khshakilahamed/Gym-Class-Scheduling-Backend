import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { IBooking, IBookingFilters } from "./booking.interface"
import { Booking } from "./booking.model"
import { IPaginationOptions } from "../../../interfaces/pagination"
import { IGenericResponse } from "../../../interfaces/common"
import { paginationHelpers } from "../../../helpers/paginationHelper"
import { bookingSearchableFields } from "./booking.constant"
import { SortOrder } from "mongoose"

const create = async (payload: IBooking): Promise<IBooking> => {
      const isExist = await Booking.findOne({ userId: payload.userId, date: payload.date });

      if (isExist) {
            throw new ApiError(httpStatus.CONFLICT, `You have already a booking on ${isExist?.date}`);
      }

      // find all bookings on the similar date & schedule
      const bookingOnSameDate = await Booking.find({ date: payload.date, classScheduleId: payload.classScheduleId });

      if (bookingOnSameDate.length >= 10) {
            throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Class schedule is full. Maximum 10 trainees allowed per schedule.")
      }

      const newBooking = await (await Booking.create(payload)).populate(['classScheduleId', 'userId']);

      if (!newBooking) {
            throw new ApiError(400, 'Failed to make booking')
      }

      return newBooking;
}

const findAll = async (
      filters: IBookingFilters,
      paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
      const { searchTerm, ...filtersData } = filters;

      const { page, limit, skip, sortBy, sortOrder } =
            paginationHelpers.calculatePagination(paginationOptions);

      const andConditions = [];

      if (searchTerm) {
            andConditions.push({
                  $or: bookingSearchableFields.map((field) => ({
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

      const result = await Booking.find(whereCondition)
            .populate(["classScheduleId", "userId"])
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);

      const total = await Booking.countDocuments();

      return {
            meta: {
                  page,
                  limit,
                  total,
            },
            data: result,
      };
}

const myBookings = async (id: string, paginationOptions: IPaginationOptions) => {
      const { page, limit, skip, sortBy, sortOrder } =
            paginationHelpers.calculatePagination(paginationOptions);

      const sortConditions: { [key: string]: SortOrder } = {};

      if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
      }

      const condition = { userId: id }

      const result = await Booking.find(condition)
            .populate(["classScheduleId", "userId"])
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);

      const total = await Booking.countDocuments(condition);

      return {
            meta: {
                  page,
                  limit,
                  total,
            },
            data: result,
      };
}

const findById = async (id: string): Promise<IBooking> => {
      const booking = await Booking.findById(id).populate(['classScheduleId', 'userId']);

      if (!booking) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not found');
      }

      return booking;
}

const updatedById = async (id: string, payload: Partial<IBooking>): Promise<IBooking | null> => {
      const isExist = await Booking.findOne({ _id: id, userId: payload?.userId });

      if (!isExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not Exist');
      }

      const updatedBooking = await Booking.findByIdAndUpdate({ _id: id }, { ...payload }, { new: true }).populate(['classScheduleId', 'userId']);

      return updatedBooking;
}

const cancelById = async (id: string, payload: Partial<IBooking>): Promise<IBooking | null> => {
      const isExist = await Booking.findOne({ _id: id, userId: payload?.userId });

      if (!isExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not Exist');
      }

      const updatedBooking = await Booking.findByIdAndUpdate({ _id: isExist?._id }, { isCancel: true }, { new: true }).populate(['classScheduleId', 'userId']);

      return updatedBooking;
}

const deleteById = async (id: string): Promise<IBooking | null> => {
      const isExist = await Booking.findById(id);

      if (!isExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not Exist');
      }

      const deletedBooking = await Booking.findByIdAndDelete(id);

      return deletedBooking;
}

export const BookingService = {
      create,
      findById,
      findAll,
      myBookings,
      updatedById,
      deleteById,
      cancelById
}