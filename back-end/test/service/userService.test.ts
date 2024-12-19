import userService from '../service/user.service';
import userDb from '../repository/user.db';
import teamDb from '../repository/team.db';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from 'express-jwt';
import { Role } from '@prisma/client';
import { User } from '../model/user';

jest.mock('../repository/user.db');
jest.mock('../repository/team.db');
jest.mock('bcrypt');

const mockUser = new User({
    id: 1,
    username: 'john_doe',
    password: 'hashed_password',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    birthDate: new Date('1990-01-01'),
    role: 'PLAYER',
});

const mockTeam = {
    id: 1,
    name: 'Team A',
    description: 'A description',
};

describe('User Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllPlayers', () => {
        it('should return all players', async () => {
            userDb.getAllPlayers.mockResolvedValue([mockUser]);
            const players = await userService.getAllPlayers();
            expect(players).toEqual([mockUser]);
        });

        it('should throw an error if no players are found', async () => {
            userDb.getAllPlayers.mockResolvedValue([]);
            await expect(userService.getAllPlayers()).rejects.toThrow('No players found.');
        });
    });

    describe('getAllUsers', () => {
        it('should return all users for ADMIN role', async () => {
            userDb.getAllUsers.mockResolvedValue([mockUser]);
            const users = await userService.getAllUsers({ role: 'ADMIN' });
            expect(users).toEqual([mockUser]);
        });

        it('should throw UnauthorizedError for non-ADMIN role', async () => {
            await expect(userService.getAllUsers({ role: 'PLAYER' })).rejects.toThrow(UnauthorizedError);
        });
    });

    describe('updateUser', () => {
        it('should update a user successfully', async () => {
            userDb.getUserById.mockResolvedValue(mockUser);
            teamDb.getTeamById.mockResolvedValue(mockTeam);
            userDb.updateUser.mockResolvedValue(mockUser);

            const updatedUser = await userService.updateUser(1, {
                playerOfTeam: { id: 1 },
                description: 'New description',
            });

            expect(updatedUser).toEqual(mockUser);
        });

        it('should throw an error if team does not exist', async () => {
            userDb.getUserById.mockResolvedValue(mockUser);
            teamDb.getTeamById.mockResolvedValue(null);

            await expect(
                userService.updateUser(1, {
                    playerOfTeam: { id: 1 },
                })
            ).rejects.toThrow('Team does not exist');
        });
    });

    describe('getUserById', () => {
        it('should return a user by ID', async () => {
            userDb.getUserById.mockResolvedValue(mockUser);
            const user = await userService.getUserById(1);
            expect(user).toEqual(mockUser);
        });

        it('should throw an error if user is not found', async () => {
            userDb.getUserById.mockResolvedValue(null);
            await expect(userService.getUserById(1)).rejects.toThrow('User with username: 1 does not exist.');
        });
    });

    describe('getUserByUsername', () => {
        it('should return a user by username', async () => {
            userDb.getUserByUsername.mockResolvedValue(mockUser);
            const user = await userService.getUserByUsername({ username: 'john_doe' });
            expect(user).toEqual(mockUser);
        });

        it('should throw an error if user is not found', async () => {
            userDb.getUserByUsername.mockResolvedValue(null);
            await expect(
                userService.getUserByUsername({ username: 'unknown_user' })
            ).rejects.toThrow('User with username: unknown_user does not exist.');
        });
    });

    describe('getUsersByRole', () => {
        it('should return users by role', async () => {
            userDb.getUsersByRole.mockResolvedValue([mockUser]);
            const users = await userService.getUsersByRole('PLAYER');
            expect(users).toEqual([mockUser]);
        });

        it('should throw an error if no users are found', async () => {
            userDb.getUsersByRole.mockResolvedValue([]);
            await expect(userService.getUsersByRole('PLAYER')).rejects.toThrow('No users found.');
        });
    });

    describe('authenticate', () => {
        it('should authenticate a user with valid credentials', async () => {
            userDb.getUserByUsername.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);

            const response = await userService.authenticate({
                username: 'john_doe',
                password: 'securepassword',
            });

            expect(response).toHaveProperty('token');
            expect(response.username).toBe('john_doe');
        });

        it('should throw an error for incorrect password', async () => {
            userDb.getUserByUsername.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            await expect(
                userService.authenticate({ username: 'john_doe', password: 'wrongpassword' })
            ).rejects.toThrow('Incorrect password.');
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            userDb.getUserByUsername.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashed_password');
            userDb.createUser.mockResolvedValue(mockUser);

            const newUser = await userService.createUser({
                username: 'john_doe',
                password: 'securepassword',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                birthDate: new Date('1990-01-01'),
            });

            expect(newUser).toEqual(mockUser);
        });

        it('should throw an error if username already exists', async () => {
            userDb.getUserByUsername.mockResolvedValue(mockUser);

            await expect(
                userService.createUser({
                    username: 'john_doe',
                    password: 'securepassword',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    birthDate: new Date('1990-01-01'),
                })
            ).rejects.toThrow('User with username john_doe is already registered.');
        });
    });
});
