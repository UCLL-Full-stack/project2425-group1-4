/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "FC Barcelona"
 *         description:
 *           type: string
 *           example: "The best football team in the world."
 *         coach:
 *           $ref: '#/components/schemas/User'
 *         players:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         matches:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               matchId:
 *                 type: integer
 *                 example: 1
 *               teamId:
 *                 type: integer
 *                 example: 2
 *         goals:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 123
 *               time:
 *                 type: integer
 *                 example: 45
 *               matchId:
 *                 type: integer
 *                 example: 1
 *               teamId:
 *                 type: integer
 *                 example: 1
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 123
 *         firstName:
 *           type: string
 *           example: "Lionel"
 *         lastName:
 *           type: string
 *           example: "Messi"
 *         role:
 *           type: string
 *           example: "PLAYER"
 */

import express, { Request, Response } from 'express';
import teamService from '../service/team.service';
import { Role } from '../types';

const teamRouter = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retrieve a list of all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
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
 *                   example: "An error occurred."
 */
teamRouter.get('/', async (req: Request, res: Response) => {
    try {
        const request = req as Request & { auth: { role: Role } };
        const { role } = request.auth;
        const teams = await teamService.getAllTeams({ role });
        res.status(200).json(teams);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Retrieve a specific team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the team
 *     responses:
 *       200:
 *         description: Successfully retrieved the team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
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
 *                   example: "Team not found."
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
 *                   example: "An error occurred."
 */

teamRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const team = await teamService.getTeamById(Number(id));
        if (!team) {
            return res.status(404).json({ status: 'error', errorMessage: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team's information
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: Successfully updated the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Team updated successfully."
 *       404:
 *         description: Team not found
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
 *                   example: "Team not found."
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
 *                   example: "An error occurred."
 */

teamRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTeamData = req.body;

    try {
        const team = await teamService.getTeamById(Number(id));
        if (!team) {
            return res.status(404).json({ status: 'error', errorMessage: 'Team not found' });
        }

        const updateResult = await teamService.updateTeam(updatedTeamData);
        if (!updateResult) {
            throw new Error('Failed to update team');
        }

        res.status(200).json({ message: 'Team updated successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage });
    }
});

/**
 * @swagger
 * /teams/{id}/addPlayer:
 *   put:
 *     summary: Add a player to a team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: integer
 *                 description: The unique identifier of the player
 *                 example: 123
 *     responses:
 *       200:
 *         description: Player successfully added to the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Player added to team successfully."
 *       404:
 *         description: Team or player not found
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
 *                   example: "Team or player not found."
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
 *                   example: "An error occurred."
 */

teamRouter.put('/:id/addPlayer', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { playerId } = req.body;

    try {
        const result = await teamService.addPlayerToTeam(Number(id), playerId);
        if (!result) {
            return res.status(404).json({ message: 'Team or player not found' });
        }
        res.status(200).json({ message: 'Player added to team successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding player to team' });
    }
});

/**
 * @swagger
 * /teams/{id}/removePlayer:
 *   put:
 *     summary: Remove a player from a team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: integer
 *                 description: The unique identifier of the player to remove
 *                 example: 123
 *     responses:
 *       200:
 *         description: Player removed from team successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Player removed from team successfully
 *       404:
 *         description: Team or player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Team or player not found
 *       400:
 *         description: Bad request due to an error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error removing player from team
 */
teamRouter.put('/:id/removePlayer', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { playerId } = req.body;

    try {
        const result = await teamService.removePlayerFromTeam(Number(id), playerId);
        if (!result) {
            return res.status(404).json({ message: 'Team or player not found' });
        }
        res.status(200).json({ message: 'Player removed from team successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error removing player from team' });
    }
});

export default teamRouter;
