import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';
import teamDb from '../repository/team.db';

const getAllPlayers = async (): Promise<User[]> => {
    const players = await userDb.getAllPlayers();
    if (!players) {
        throw new Error('No players found.');
    }
    return players;
};

const updateUser = async (userId: number, editedUser: UserInput): Promise<User | null> => {
    const user = await userDb.getUserById(userId);

    // Return null if the user is not found
    if (!user) {
        return null;
    }

    // Destructure properties from editedUser
    const { playerOfTeam, description } = editedUser;

    // Update fields only if they are provided
    if (playerOfTeam !== undefined && playerOfTeam !== null) {
        const teamExists = await teamDb.getTeamById(playerOfTeam); // Add await here
        if (!teamExists) {
            throw new Error('Team does not exist');
        }

        user.setPlayerOfTeam(playerOfTeam);
    }

    if (description !== undefined && description !== null) {
        user.setDescription(description);
    }

    // Save the updated user in the database
    await userDb.updateUser(user);
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
