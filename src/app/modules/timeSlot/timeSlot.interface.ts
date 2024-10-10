import { ObjectId } from "mongoose"

export type ITimeSlot = {
      startingTime: string
      endingTime: string
      createdBy: ObjectId
      updatedBy: ObjectId
}