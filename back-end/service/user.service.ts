import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';

const getAllPlayers = async (): Promise<User[]> => {
    const players = await userDb.getAllPlayers();
    if (!players) {
        throw new Error('No players found.');
    }
    return players;
};

export default { getAllPlayers };
