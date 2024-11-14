import { tr } from 'date-fns/locale';
import { User } from '../model/user';
import database from './database';

const getAllPlayers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            where: {
                role: 'PLAYER',
            },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                email: email,
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const updateUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: {
                id: user.getId(),
            },
            data: {
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                password: user.getPassword(),
                birthDate: user.getBirthDate(),
                email: user.getEmail(),
                username: user.getUsername(),
                description: user.getDescription(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

export default { getAllPlayers, getAllUsers, getUserById, updateUser, getUserByEmail };
