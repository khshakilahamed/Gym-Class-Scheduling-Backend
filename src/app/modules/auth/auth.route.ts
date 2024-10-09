import express from 'express'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post('/createTrainer', AuthController.createTrainer)

export const AuthRoutes = router
