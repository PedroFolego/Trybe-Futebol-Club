import { Router } from 'express';
import login from './login';
import teams from './teams';
import matches from './matches';

const router = Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);
export default router;
