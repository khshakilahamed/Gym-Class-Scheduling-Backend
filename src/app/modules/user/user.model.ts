import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    avatar: String,
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['admin', 'trainer', 'trainee'],
      default: 'trainee',
    },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.isUserExist = async function (
  email: string,
): Promise<IUser | null> {
  const user = await User.findOne({ email }).select('+password')

  return user
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function (next) {
  // Hash password
  const user = this as IUser
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})

export const User = mongoose.model<IUser, UserModel>('User', userSchema)
