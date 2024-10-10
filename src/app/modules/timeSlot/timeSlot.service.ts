import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { ITimeSlot } from "./timeSlot.interface"
import { TimeSlot } from "./timeSlot.model"

const create = async (payload: ITimeSlot): Promise<ITimeSlot> => {
      const isExist = await TimeSlot.findOne({ startingTime: payload.startingTime, endingTime: payload.endingTime })

      if (isExist) {
            throw new ApiError(httpStatus.CONFLICT, 'Time slot Already Exist')
      }

      const newTimeSlot = await (await TimeSlot.create(payload)).populate(['createdBy', 'updatedBy']);

      if (!newTimeSlot) {
            throw new ApiError(400, 'Failed to create time slot')
      }

      return newTimeSlot;
}

const findAll = async (): Promise<ITimeSlot[]> => {

      const timeSlots = await TimeSlot.find().populate(['createdBy', 'updatedBy']);

      return timeSlots;
}

const findById = async (id: string): Promise<ITimeSlot> => {
      const timeSlot = await TimeSlot.findById(id).populate(['createdBy', 'updatedBy']);

      if (!timeSlot) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Time slot does not found');
      }

      return timeSlot;
}

const updatedById = async (id: string, payload: Partial<ITimeSlot>): Promise<ITimeSlot | null> => {
      const isExist = await TimeSlot.findById(id);

      if (!isExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Time slot does not Exist');
      }

      const updatedTimeSlot = await TimeSlot.findByIdAndUpdate({ _id: id }, { ...payload }, { new: true });

      return updatedTimeSlot;
}

const deleteById = async (id: string): Promise<ITimeSlot | null> => {
      const isExist = await TimeSlot.findById(id);

      if (!isExist) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Time slot does not Exist');
      }

      const deletedTimeSlot = await TimeSlot.findByIdAndDelete(id);

      return deletedTimeSlot;
}

export const TimeSlotService = {
      create,
      findById,
      findAll,
      updatedById,
      deleteById
}