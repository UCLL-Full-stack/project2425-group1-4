import userDb from '../repository/prisma/user.db';
import { User } from '../domain/model/user';

const getAllPlayers = async (): Promise<User[]> => {
    return await userDb.getAllPlayers();
};
