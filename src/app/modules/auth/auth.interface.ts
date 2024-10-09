import { IUser } from '../user/user.interface'

export type ICreateUserResponse = {
  user: Partial<IUser>
}
