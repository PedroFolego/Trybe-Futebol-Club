import { Router } from 'express';
import login from './login';
import teams from './teams';

const router = Router();

router.use('/login', login);
router.use('/teams', teams);
export default router;
