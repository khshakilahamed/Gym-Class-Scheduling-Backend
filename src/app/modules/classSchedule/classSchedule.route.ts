import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ClassScheduleController } from './classSchedule.controller';
const router = express.Router();

router.get('/trainer-schedule',
      auth(ENUM_USER_ROLE.TRAINER),
      ClassScheduleController.trainerSchedules
);
router.get('/',
      auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER),
      ClassScheduleController.findAllSchedules
);
router.get('/:id',
      auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINEE, ENUM_USER_ROLE.TRAINER),
      ClassScheduleController.findById
);
router.post('/', auth(ENUM_USER_ROLE.ADMIN), ClassScheduleController.create);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), ClassScheduleController.updatedById);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), ClassScheduleController.deleteById);

export const ClassScheduleRoute = router;
