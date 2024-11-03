import teamDb from '../domain/data-access/team.db';
import userDb from '../domain/data-access/user.db';
import { Team } from '../domain/model/team';

const getAllTeams = async (): Promise<Team[]> => {
    return await teamDb.getAllTeams();
};

// const getTeamsByName = async (name: string): Promise<Team[]> => {
//     const teams = await teamDb.getTeamsByName(name);

//     if (teams.length === 0 && !accept_null) {
//         throw new Error("No teams found");
//     }

//     return teams;
// }

const getTeamById = async (id: string | number): Promise<Team> => {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const team = await teamDb.getTeamById(numericId);

    if (!team) {
        throw new Error('Team not found');
    }

    return team;
};

const getTeamNameById = async (id: number): Promise<string | null> => {
    const team: Team | null = await teamDb.getTeamById(id);
    return team ? team.getName() : null;
};

const updateTeam = async (id: string | number, updatedData: Partial<Team>): Promise<Team> => {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const team = await teamDb.getTeamById(numericId);

    if (!team) {
        throw new Error('Team not found');
    }

    const updatedTeam = await teamDb.updateTeam(numericId, updatedData);
    return updatedTeam;
};

const addPlayerToTeam = async (teamId: number, playerId: number): Promise<boolean> => {
    const team = await teamDb.getTeamById(teamId);
    const player = await userDb.getUserById(playerId);

    if (!team || !player) {
        return false;
    }

    // Check if the player is already part of the team
    const isPlayerInTeam = team.getPlayers().some((p) => p.getId() === playerId);
    if (!isPlayerInTeam) {
        team.addPlayer(player);
        await teamDb.updateTeam(teamId, team);
    }
    return true;
};

const removePlayerFromTeam = async (teamId: number, playerId: number): Promise<boolean> => {
    const team = await teamDb.getTeamById(teamId);

    if (!team) {
        return false; // Team not found
    }

    const player = await userDb.getUserById(playerId);
    if (!player) {
        return false; // Player not found
    }
    team.removePlayer(player); // Assuming `removePlayer` is a method that removes a player by User object
    player.setPlayerOfTeam(teamId);
    await teamDb.updateTeam(teamId, team);
    return true;
};

export default {
    getTeamNameById,
    getTeamById,
    getAllTeams,
    updateTeam,
    addPlayerToTeam,
    removePlayerFromTeam,
};
