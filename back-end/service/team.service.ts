import teamDb from '../repository/team.db';
import userDb from '../repository/user.db';
import { Team } from '../model/team';
import { Role, TeamInput } from '../types';

const getAllTeams = async (): Promise<Team[]> => {
    return await teamDb.getAllTeams();
};

const getTeamsByName = async (name: string): Promise<Team[]> => {
    const teams = await teamDb.getTeamsByName(name);

    if (!teams) {
        throw new Error('Could not find any teams with that name');
    }

    return teams;
};

const getTeamById = async (id: string | number): Promise<Team> => {
    if (!id) {
        throw new Error('Team ID is required.');
    }

    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (isNaN(numericId)) {
        throw new Error('Invalid Team ID. It must be a number.');
    }

    const team = await teamDb.getTeamById(numericId);

    if (!team) {
        throw new Error(`Team with ID ${numericId} not found.`);
    }

    return team;
};

const getTeamNameById = async (id: number): Promise<string | null> => {
    const team: Team | null = await teamDb.getTeamById(id);
    return team ? team.getName() : null;
};

const updateTeam = async (updateTeam: TeamInput): Promise<Team> => {
    const validNewData = new Team(updateTeam);

    const numericId = Number(validNewData.getId());
    const team = await teamDb.getTeamById(numericId);

    if (!team) {
        throw new Error('Team not found');
    }

    const updatedTeam = await teamDb.updateTeam(validNewData);
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
        // team.addPlayer(player);
        await teamDb.updateTeam(team);
    }
    return true;
};

const removePlayerFromTeam = async (teamId: number, playerId: number) => {
    const team = await teamDb.getTeamById(teamId);

    if (!team) {
        return false; // Team not found
    }

    const player = await userDb.getUserById(playerId);
    if (!player) {
        return false; // Player not found
    }
    // team.removePlayer(player); // Assuming `removePlayer` is a method that removes a player by User object
    return teamDb.updateTeam(team);
};

export default {
    getTeamNameById,
    getTeamById,
    getAllTeams,
    updateTeam,
    addPlayerToTeam,
    removePlayerFromTeam,
};
