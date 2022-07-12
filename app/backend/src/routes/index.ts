import { Router } from 'express';
import login from './login';
import teams from './teams';
import matches from './matches';
import leaderboard from './leaderboard';

const router = Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);
router.use('/leaderboard', leaderboard);

export default router;
