import { Team } from '../model/team';
import userDb from './user.db';

let currentId = 1;

const player1 = userDb.getUserById(1);
if (!player1) {
    throw new Error('User with ID 1 not found');
}

let teams: Team[] = [
    new Team({
        id: currentId++,
        name: 'FC Barcelona',
        captain: player1,
        coach: player1,
        players: [],
        description: 'Best team in the world',
    }),
    new Team({
        id: currentId++,
        name: 'PSG',
        captain: player1,
        coach: player1,
        players: [],
        description: 'Vive la France!',
    }),
    new Team({
        id: currentId++,
        name: 'Club Brugge',
        captain: player1,
        coach: player1,
        players: [],
        description: 'black and blue',
    }),
];

const getAllTeams = (): Team[] => {
    return teams;
};

const getTeamById = async (id: number): Promise<Team | null> => {
    const team = teams.find((t) => t.getId() === id);
    return team || null;
};

const addTeam = (team: Team): void => {
    teams.push(team);
};

const updateTeam = (id: number, updatedTeam: Partial<Team>): void => {
    const teamIndex = teams.findIndex((team) => team.getId() === id);
    if (teamIndex !== -1) {
        teams[teamIndex] = { ...teams[teamIndex], ...updatedTeam } as Team;
    }
};

const deleteTeam = (id: number): void => {
    teams = teams.filter((team) => team.getId() !== id);
};

export default { teams, getAllTeams, getTeamById, addTeam, updateTeam, deleteTeam };
