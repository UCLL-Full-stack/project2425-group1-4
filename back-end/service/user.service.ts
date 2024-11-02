import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';

const getAllPlayers = async (): Promise<User[]> => {
    const players = await userDb.getAllPlayers();
    if (!players) {
        throw new Error('No players found.');
    }
    return players;
};

const updateUser = async (
    userId: number,
    data: { teamId?: number; description?: string }
): Promise<User | null> => {
    const user = userDb.getUserById(userId);
    if (!user) {
        return null;
    }

    if (data.teamId !== undefined) {
        user.setPlayerOfTeam(data.teamId);
    }
    if (data.description) {
        user.setDescription(data.description);
    }

    userDb.updateUser(user);
    return user;
};

const getUserById = async (userId: number): Promise<User | null> => {
    const user = await userDb.getUserById(userId);
    if (!user) {
        return null;
    }
    return user;
};

export default { getAllPlayers, updateUser, getUserById };
