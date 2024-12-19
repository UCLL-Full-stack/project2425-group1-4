import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import teamDb from '../../repository/team.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../util/jwt';
import { UnauthorizedError } from 'express-jwt';
import { User } from '../../model/user';
import { Role } from '@prisma/client';

jest.mock('../repository/user.db');
jest.mock('../repository/team.db');
jest.mock('bcrypt');
jest.mock('../util/jwt');

describe('userService', () => {
    describe('getAllPlayers', () => {
        it('should return a list of players', async () => {
            const mockPlayers = [new User({
                    id: 1,
                    firstName: "firstname",
                    lastName: "lastname",
                    password: "password",
                    birthDate: new Date('2000-01-01'),
                    email: "testing.user@goalpro.app",
                    username: "testUsername",
                    description: "Test a description",
                    role: 'USER',
                })];
            userDb.getAllPlayers.mockResolvedValue(mockPlayers);

            const players = await userService.getAllPlayers();

            expect(players).toEqual(mockPlayers);
            expect(userDb.getAllPlayers).toHaveBeenCalled();
        });

        it('should throw an error if no players are found', async () => {
            userDb.getAllPlayers.mockResolvedValue(null);

            await expect(userService.getAllPlayers()).rejects.toThrow('No players found.');
        });
    });

    describe('getAllUsers', () => {
        it('should return a list of users if role is ADMIN', async () => {
            const mockUsers = [new User({ id: 1, username: 'admin1' })];
            userDb.getAllUsers.mockResolvedValue(mockUsers);

            const users = await userService.getAllUsers({ role: 'ADMIN' });

            expect(users).toEqual(mockUsers);
            expect(userDb.getAllUsers).toHaveBeenCalled();
        });

        it('should throw UnauthorizedError if role is not ADMIN', async () => {
            await expect(userService.getAllUsers({ role: 'USER' })).rejects.toThrow(UnauthorizedError);
        });
    });

    describe('updateUser', () => {
        it('should update and return a user', async () => {
            const mockUser = new User({ id: 1, username: 'user1' });
            const mockTeam = { id: 1, name: 'Team A' };

            userDb.getUserById.mockResolvedValue(mockUser);
            teamDb.getTeamById.mockResolvedValue(mockTeam);
            userDb.updateUser.mockResolvedValue(mockUser);

            const editedUser = { playerOfTeam: { id: 1 }, description: 'Updated' };
            const updatedUser = await userService.updateUser(1, editedUser);

            expect(updatedUser).toEqual(mockUser);
            expect(userDb.updateUser).toHaveBeenCalledWith(mockUser);
        });

        it('should throw an error if the team does not exist', async () => {
            const mockUser = new User({ id: 1, username: 'user1' });

            userDb.getUserById.mockResolvedValue(mockUser);
            teamDb.getTeamById.mockResolvedValue(null);

            const editedUser = { playerOfTeam: { id: 1 } };

            await expect(userService.updateUser(1, editedUser)).rejects.toThrow('Team does not exist');
        });

        it('should return null if the user does not exist', async () => {
            userDb.getUserById.mockResolvedValue(null);

            const editedUser = { playerOfTeam: { id: 1 } };
            const updatedUser = await userService.updateUser(1, editedUser);

            expect(updatedUser).toBeNull();
        });
    });

    describe('authenticate', () => {
        it('should authenticate a user and return a token', async () => {
            const mockUser = new User({ username: 'user1', password: 'hashedPassword' });

            userDb.getUserByUsername.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            generateJwtToken.mockReturnValue('mockToken');

            const response = await userService.authenticate({ username: 'user1', password: 'password' });

            expect(response.token).toBe('mockToken');
            expect(response.username).toBe('user1');
            expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
        });

        it('should throw an error if the password is incorrect', async () => {
            const mockUser = new User({ username: 'user1', password: 'hashedPassword' });

            userDb.getUserByUsername.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            await expect(userService.authenticate({ username: 'user1', password: 'wrongPassword' })).rejects.toThrow('Incorrect password.');
        });
    });

    describe('createUser', () => {
        it('should create and return a new user', async () => {
            const mockUser = new User({ username: 'user1' });

            userDb.getUserByUsername.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedPassword');
            userDb.createUser.mockResolvedValue(mockUser);

            const newUser = await userService.createUser({
                username: 'user1',
                password: 'password',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                birthDate: new Date(),
            });

            expect(newUser).toEqual(mockUser);
            expect(userDb.createUser).toHaveBeenCalled();
        });

        it('should throw an error if the username already exists', async () => {
            const mockUser = new User({ username: 'user1' });

            userDb.getUserByUsername.mockResolvedValue(mockUser);

            await expect(
                userService.createUser({
                    username: 'user1',
                    password: 'password',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    birthDate: new Date(),
                })
            ).rejects.toThrow('User with username user1 is already registered.');
        });
    });
});
