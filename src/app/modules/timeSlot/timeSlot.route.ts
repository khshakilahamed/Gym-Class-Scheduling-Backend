import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { TimeSlotController } from './timeSlot.controller';
const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.ADMIN), TimeSlotController.create);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), TimeSlotController.updatedById);
router.get('/', TimeSlotController.findAll);
router.get('/:id', TimeSlotController.findById);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), TimeSlotController.deleteById);

export const TimeSlotRoute = router;
