/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Match management endpoints.
 */

import express, { Request, Response } from 'express';
import matchService from '../service/match.service';

const matchRouter = express.Router();

/**
 * @swagger
 * /matches:
 *   get:
 *     summary: Retrieve a list of all matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 *       400:
 *         description: Bad request due to an error
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
matchRouter.get('/', async (req: Request, res: Response) => {
    try {
        const matches = await matchService.getAllMatches();
        res.status(200).json(matches);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(400).json({ status: 'error', errorMessage });
    }
});

export default matchRouter;
