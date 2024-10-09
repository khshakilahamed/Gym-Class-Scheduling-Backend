import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        field: el?.path,
        message: el?.message,
      }
    },
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation error occurred.',
    errorMessages: errors,
  }
}

export default handleValidationError
