/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Match management endpoints.
 */

import express, { NextFunction, Request, Response } from 'express';
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
matchRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const matches = await matchService.getAllMatches();
        res.status(200).json(matches);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     summary: Retrieve a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the match
 *     responses:
 *       200:
 *         description: Match data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 12345
 *       404:
 *         description: Match not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Match not found"
 */
matchRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const matchId = req.params.id;
        const match = await matchService.getMatchById(matchId);
        res.status(200).json(match);
    } catch (error) {
        next(error);
    }
});

export default matchRouter;
