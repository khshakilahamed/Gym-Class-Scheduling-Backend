import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()

router.post('/createTrainer', UserController.createTrainer)

export const UserRoutes = router
