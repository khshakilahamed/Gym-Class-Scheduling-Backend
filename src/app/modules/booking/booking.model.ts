import mongoose, { Schema } from 'mongoose'
import { IBooking } from './booking.interface'

const bookingSchema = new Schema<IBooking>(
      {
            classScheduleId: {
                  type: Schema.Types.ObjectId,
                  ref: 'ClassSchedule',
                  required: [true, 'Class schedule is required'],
            },
            userId: {
                  type: Schema.Types.ObjectId,
                  ref: 'User',
                  required: [true, 'User is required'],
            },
            date: {
                  type: String,
                  required: [true, 'Date is required'],
            },
            isCancel: {
                  type: Boolean,
                  default: false
            }
      },
      {
            timestamps: true,
      },
)


export const Booking = mongoose.model<IBooking>('Booking', bookingSchema)
