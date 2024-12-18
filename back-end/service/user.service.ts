import userDb from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types';
import teamDb from '../repository/team.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import { UnauthorizedError } from 'express-jwt';

const getAllPlayers = async (): Promise<User[]> => {
    const players = await userDb.getAllPlayers();
    if (!players) {
        throw new Error('No players found.');
    }
    return players;
};

const getAllUsers = async ({ role }: { role: string }): Promise<User[]> => {
    if (role === 'ADMIN') {
        return userDb.getAllUsers();
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource',
        });
    }
};

const updateUser = async (userId: number, editedUser: UserInput): Promise<User | null> => {
    const user = await userDb.getUserById(userId);

    console.log('user', editedUser);

    // Return null if the user is not found
    if (!user) {
        return null;
    }

    // Destructure properties from editedUser
    const { playerOfTeam, description, email, password } = editedUser;

    // Update team if provided and different
    if (
        playerOfTeam?.id !== undefined &&
        playerOfTeam.id !== null &&
        playerOfTeam.id !== user.getPlayerOfTeam()?.getId()
    ) {
        const team = await teamDb.getTeamById(playerOfTeam.id);
        console.log('team', team);
        if (!team) {
            throw new Error('Team does not exist');
        }
        user.setPlayerOfTeam(team); // Use the actual Team object
    }

    // Update description if provided and different
    if (
        description !== undefined &&
        description !== null &&
        user.getDescription() !== description
    ) {
        user.setDescription(description);
    }

    // Update email if provided and different
    if (email !== undefined && email !== null && user.getEmail() !== email) {
        const existingEmail = await userDb.getUserByEmail(email);
        if (existingEmail) {
            throw new Error('Email already exists');
        }
        user.setEmail(email);
    }

    // Update password if provided and different
    if (password !== undefined && password !== null && user.getPassword() !== password) {
        user.setPassword(password);
    }

    // Save the updated user in the database
    return userDb.updateUser(user);
};

const getUserById = async (userId: number): Promise<User> => {
    const user = await userDb.getUserById(userId);
    if (!user) {
        throw new Error(`User with username: ${userId} does not exist.`);
    }
    return user;
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    const teamId = user.getCoachOfTeam()?.getId() ?? user.getPlayerOfTeam()?.getId();

    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
        ...(teamId !== undefined && { teamId: teamId }),
    };
};

const createUser = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    birthDate,
}: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByUsername({ username });
    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
        birthDate,
    });

    return await userDb.createUser(user);
};

export default {
    getAllPlayers,
    getAllUsers,
    updateUser,
    getUserById,
    getUserByUsername,
    authenticate,
    createUser,
};
