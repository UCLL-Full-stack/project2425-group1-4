import express, { NextFunction, Request, Response } from 'express';

import GoalService from '../service/goal.service';
import { GoalInput } from '../types';

const goalRouter = express.Router();



goalRouter.get('/match/:matchId', async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;
        const goals = await GoalService.getGoalsWithDetails(Number(matchId));
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch goal details' });
    }
});

export default goalRouter;