import { ObjectId } from "mongoose"

export type IBooking = {
      classScheduleId: ObjectId
      userId: ObjectId
      date: string
      isCancel: boolean
}

export type IBookingFilters = {
      searchTerm?: string;
      id?: string;
      date?: string;
      isCancel?: string | boolean;
};
