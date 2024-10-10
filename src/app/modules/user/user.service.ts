import httpStatus from 'http-status'
import { ICreateUserResponse, IUser, IUserFilters } from '../user/user.interface'
import { User } from '../user/user.model'
import ApiError from '../../../errors/ApiError'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { userSearchableFields } from './user.constant'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { IGenericResponse } from '../../../interfaces/common'

const createTrainer = async (payload: IUser): Promise<ICreateUserResponse> => {
  const existUser = await User.findOne({ email: payload.email })

  if (existUser) {
    throw new ApiError(httpStatus.CONFLICT, 'User Already Exist')
  }

  if (!payload.role) {
    payload.role = ENUM_USER_ROLE.TRAINER;
  }

  const newUser = await User.create(payload)

  if (!newUser) {
    throw new ApiError(400, 'Failed to create user')
  }

  return {
    user: newUser,
  }
}

const findAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await User.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };;
}

const updateUser = async (id: string, updatedData: Partial<IUser>): Promise<IUser> => {
  const existUser = await User.findById(id);

  if (!existUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (existUser.role !== ENUM_USER_ROLE.TRAINER) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You can not update this user profile');
  }

  if (updatedData.password) {
    delete updatedData.password;
  }

  const updatedUser = await User.findByIdAndUpdate({ _id: existUser._id }, { ...updatedData }, { new: true })

  return updatedUser!
}

export const UserService = {
  createTrainer,
  findAllUsers,
  updateUser,
}
