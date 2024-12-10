import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import * as dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import userRouter from './controller/user.routes';
import teamRouter from './controller/team.routes';
import matchRouter from './controller/match.routes';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status'],
    })
);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GoalPro API',
            version: '1.0.0',
            description: 'API documentation for managing users and teams',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique identifier for the user',
                            example: 1,
                        },
                        firstName: {
                            type: 'string',
                            description: 'First name of the user',
                            example: 'John',
                        },
                        lastName: {
                            type: 'string',
                            description: 'Last name of the user',
                            example: 'Doe',
                        },
                        email: {
                            type: 'string',
                            description: 'Email address of the user',
                            example: 'johndoe@example.com',
                        },
                        username: {
                            type: 'string',
                            description: 'Username of the user',
                            example: 'johndoe123',
                        },
                        description: {
                            type: 'string',
                            description: 'Description or bio of the user',
                            example: 'Software developer with a passion for coding.',
                        },
                        role: {
                            type: 'string',
                            description: 'Role of the user (e.g., Player, Coach, Admin)',
                            example: 'Player',
                        },
                    },
                },
                Team: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique identifier for the team',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the team',
                            example: 'Team A',
                        },
                        captain: {
                            $ref: '#/components/schemas/User',
                            description: 'Captain of the team',
                        },
                        coach: {
                            $ref: '#/components/schemas/User',
                            description: 'Coach of the team',
                        },
                        players: {
                            type: 'array',
                            description: 'List of players in the team',
                            items: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                        description: {
                            type: 'string',
                            description: 'Brief description of the team',
                            example: 'A top football team.',
                        },
                    },
                },
            },
        },
    },
    apis: ['./controller/*.ts'], // Ensure this points to your route files
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routers
app.use('/users', userRouter);
app.use('/matches', matchRouter);
app.use('/teams', teamRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});

export default app;
