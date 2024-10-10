import mongoose, { Schema } from 'mongoose'
import { ITimeSlot } from './timeSlot.interface'

const timeSlotSchema = new Schema<ITimeSlot>(
      {
            startingTime: {
                  type: String,
                  required: [true, 'Starting time is required'],
            },
            endingTime: {
                  type: String,
                  required: [true, 'Ending time is required'],
            },
            createdBy: {
                  type: Schema.Types.ObjectId,
                  ref: 'User',
                  required: [true, 'Created by user is required'],
            },
            updatedBy: {
                  type: Schema.Types.ObjectId,
                  ref: 'User',
                  required: [true, 'Updated by user is required'],
            },
      },
      {
            timestamps: true,
      },
)


export const TimeSlot = mongoose.model<ITimeSlot>('TimeSlot', timeSlotSchema)
