/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management
 */

import express, { NextFunction, Request, Response } from "express";
import teamService from "../service/team.service";
import { Team } from "../domain/model/team";
import { TeamInput } from "../types";

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
 *                 errorMessage:
 *                   type: string
 */
teamRouter.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export default teamRouter;