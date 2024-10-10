import { ObjectId } from "mongoose";

export type IDays =
      | 'sunday'
      | 'monday'
      | 'tuesday'
      | 'wednesday'
      | 'thursday'
      | 'friday'
      | 'saturday';

export type IClassSchedule = {
      title: string
      day: IDays
      maxTrainees: number
      trainers: ObjectId[]
      timeSlotId: ObjectId
      duration: number
      createdBy: ObjectId
      updatedBy: ObjectId
}


export type IClassScheduleFilters = {
      searchTerm?: string;
      id?: string;
      title?: string;
      day?: string;
};