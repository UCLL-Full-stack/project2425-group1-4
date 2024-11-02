import teamDb from '../domain/data-access/team.db';
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

export default { getTeamNameById, getTeamById, getAllTeams, updateTeam };
