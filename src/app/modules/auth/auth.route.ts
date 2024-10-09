import express from 'express'
import { AuthController } from './auth.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.post('/login', AuthController.loginUser)
router.post('/register', AuthController.traineeRegister) // trainee register only
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.TRAINEE),
  AuthController.myProfile,
)

export const AuthRoute = router
