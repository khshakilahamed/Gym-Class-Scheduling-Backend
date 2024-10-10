/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { UserRoute } from '../modules/user/user.route'
import { AuthRoute } from '../modules/auth/auth.route'
import { TimeSlotRoute } from '../modules/timeSlot/timeSlot.route'
import { ClassScheduleRoute } from '../modules/classSchedule/classSchedule.route'

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
  {
    path: '/class-schedule',
    route: ClassScheduleRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
