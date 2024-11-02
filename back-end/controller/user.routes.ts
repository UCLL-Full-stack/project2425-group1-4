/**
 * @swagger
 * tags:
 *   name: Users
 *   description: All endpoints for users
 */

import express, { Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /users/players:
 *   get:
 *     summary: Retrieve a list of players
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   role:
 *                     type: string
 *                     example: "Player"
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 errorMessage:
 *                   type: string
 *                   example: "Error message"
 */
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

userRouter.get('/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const { teamId, description } = req.body;

    const updatedUser = await userService.updateUser(userId, { teamId, description });
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

export default userRouter;
