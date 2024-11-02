import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import userRouter from './controller/user.routes';
import teamRouter from './controller/team.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request for ${req.url}`);
    next();
});

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chatbox API',
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
app.use('/teams', teamRouter); // Assuming you have a team router

// Start the server
app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});

export default app;
