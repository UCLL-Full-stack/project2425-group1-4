import { Team } from '../model/team';
import database from './database';

const getAllTeams = async (): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            include: {
                captain: true,
                coach: true,
                players: true,
            },
        });
        return teamsPrisma.map((teamPrisma) => Team.from(teamPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error, See server log for details.');
    }
};

const getTeamById = async (id: number): Promise<Team | null> => {
    const team = teams.find((t) => t.getId() === id);
    return team || null;
};

const addTeam = (team: Team): void => {
    teams.push(team);
};

const updateTeam = (id: number, updatedTeam: Partial<Team>): Team => {
    const teamIndex = teams.findIndex((team) => team.getId() === id);
    if (teamIndex !== -1) {
        teams[teamIndex] = { ...teams[teamIndex], ...updatedTeam } as Team;
    }
    return teams[teamIndex];
};

const deleteTeam = (id: number): void => {
    teams = teams.filter((team) => team.getId() !== id);
};

export default { teams, getAllTeams, getTeamById, addTeam, updateTeam, deleteTeam };
