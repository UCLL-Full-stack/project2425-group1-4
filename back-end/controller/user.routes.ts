import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

userRouter.get('/players', async (req: Request, res: Response) => {
    try {
        const players = await userService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(400).json({ status: 'error', errorMessage: 'Unknown error' });
        }
    }
});

export default userRouter;
