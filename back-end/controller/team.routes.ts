/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team endpoints
 */

import express, { Request, Response } from 'express';
import teamService from '../service/team.service';

const teamRouter = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retrieve a list of teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Error message
 */
teamRouter.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await teamService.getAllTeams();
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
 *     summary: Retrieve a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The team ID
 *     responses:
 *       200:
 *         description: The team data
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
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Team not found
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Error message
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
 *     summary: Update a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Error message
 *       404:
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Team not found
 */
teamRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTeamData = req.body;

    try {
        const team = await teamService.getTeamById(Number(id));
        if (!team) {
            return res.status(404).json({ status: 'error', errorMessage: 'Team not found' });
        }

        const updateResult = await teamService.updateTeam(Number(id), updatedTeamData);
        if (!updateResult) {
            throw new Error('Failed to update team');
        }

        res.status(200).json({ message: 'Team updated successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage });
    }
});

export default teamRouter;
