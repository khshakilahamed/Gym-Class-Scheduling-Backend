import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ITimeSlot } from "../timeSlot/timeSlot.interface";

export const convertTimeSlotToHour = (timeSlot: ITimeSlot) => {
      const startingTime = timeSlot.startingTime;
      const endingTime = timeSlot.endingTime;

      // Ensure both startingTime and endingTime are defined and in correct format
      if (!startingTime || !endingTime) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid time format');
      }

      // Create a Date object for today and set the time for startingTime
      const start = new Date();
      const [startHours, startMinutes] = startingTime.split(":").map(Number);
      start.setHours(startHours, startMinutes, 0, 0);

      // Create a Date object for today and set the time for endingTime
      const end = new Date();
      const [endHours, endMinutes] = endingTime.split(":").map(Number);
      end.setHours(endHours, endMinutes, 0, 0);

      // Check if the Date objects are properly initialized
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid time values');
      }

      // Ensure that endingTime is greater than startingTime
      if (end <= start) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Ending time cannot be earlier or the same as starting time');
      }

      // Calculate the difference in milliseconds
      const differenceInMs = end.getTime() - start.getTime(); // Make sure to use getTime()

      // Convert milliseconds to hours (1 hour = 3,600,000 milliseconds)
      const differenceInHours = differenceInMs / (1000 * 60 * 60);

      return differenceInHours;
}