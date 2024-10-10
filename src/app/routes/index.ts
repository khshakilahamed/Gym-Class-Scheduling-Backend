/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { UserRoute } from '../modules/user/user.route'
import { AuthRoute } from '../modules/auth/auth.route'
import { TimeSlotRoute } from '../modules/timeSlot/timeSlot.route'

const router = express.Router()

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/timeslot',
    route: TimeSlotRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
