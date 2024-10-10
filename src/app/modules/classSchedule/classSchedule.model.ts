import mongoose, { Schema } from 'mongoose'
import { IClassSchedule } from './classSchedule.interface'

const classScheduleSchema = new Schema<IClassSchedule>(
      {
            title: {
                  type: String,
                  unique: true,
                  required: [true, 'Title is required'],
            },
            day: {
                  type: String,
                  required: [true, 'Day is required'],
                  enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            },
            maxTrainees: {
                  type: Number,
                  required: [true, 'Maximum trainees is required'],
                  default: 10,
            },
            trainers: {
                  type: [
                        {
                              type: Schema.Types.ObjectId,
                              ref: 'User'
                        }
                  ],  // Array of ObjectIds referencing the 'User' model
                  required: [true, 'At least one trainer is required'],   // Custom error message
            },
            timeSlotId: {
                  type: Schema.Types.ObjectId,
                  ref: 'TimeSlot',
                  required: [true, 'Created by user is required'],
            },
            duration: {
                  type: Number,
                  default: 2
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


export const ClassSchedule = mongoose.model<IClassSchedule>('ClassSchedule', classScheduleSchema)
