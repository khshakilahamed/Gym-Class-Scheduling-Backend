import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.post('/create-trainer', auth(ENUM_USER_ROLE.ADMIN), UserController.createTrainer);
router.patch('/update-user/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.findAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.findById);

export const UserRoute = router
