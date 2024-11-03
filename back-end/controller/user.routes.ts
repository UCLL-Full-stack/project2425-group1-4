/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for user management.
 */

import express, { NextFunction, Request, Response } from 'express';

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
 *         description: Successfully retrieved a list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 12345
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
 *       400:
 *         description: Bad request due to an error
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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 12345
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 role:
 *                   type: string
 *                   example: "Player"
 *                 teamId:
 *                   type: integer
 *                   example: 5
 *                 description:
 *                   type: string
 *                   example: "An avid football player"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
userRouter.get('/:id', async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user's information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamId:
 *                 type: integer
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: "A passionate midfielder"
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 12345
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 role:
 *                   type: string
 *                   example: "Player"
 *                 teamId:
 *                   type: integer
 *                   example: 5
 *                 description:
 *                   type: string
 *                   example: "A passionate midfielder"
 *       404:
 *         description: User not found for update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
userRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const editedUser = req.body;

        const updatedUser = await userService.updateUser(userId, editedUser);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

export default userRouter;
