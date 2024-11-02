import { Team } from '@types';

const getAllTeams = async (): Promise<Team[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }

        const teams: Team[] = await response.json();
        return teams;
    } catch (error) {
        console.error('Error fetching all teams:', error);
        return [];
    }
};

const getTeamById = async (teamId: number): Promise<Team | null> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch team with ID ${teamId}`);
        }

        const team: Team = await response.json();
        return team;
    } catch (error) {
        console.error(`Error fetching team by ID ${teamId}:`, error);
        return null;
    }
};

const updateTeam = async (team: Team): Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${team.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(team),
        });

        if (!response.ok) {
            throw new Error('Failed to update team');
        }

        return true;
    } catch (error) {
        console.error('Error updating team:', error);
        return false;
    }
};

const TeamService = {
    getAllTeams,
    getTeamById,
    updateTeam,
};

export default TeamService;
