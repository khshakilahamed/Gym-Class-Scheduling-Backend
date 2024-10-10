import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BookingController } from './booking.controller';
const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.TRAINEE), BookingController.create);
router.patch('/:id', auth(ENUM_USER_ROLE.TRAINEE), BookingController.updatedById);
router.patch('/cancel/:id', auth(ENUM_USER_ROLE.TRAINEE), BookingController.cancelById);
router.get('/my-booking', auth(ENUM_USER_ROLE.TRAINEE), BookingController.myBookings);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), BookingController.findAll);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), BookingController.findById);
// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookingController.deleteById);

export const BookingRoute = router;
