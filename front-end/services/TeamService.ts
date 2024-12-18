import { Team } from '@types';

const getAllTeams = async () => {
    const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/teams', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const getTeamById = async (teamId: number): Promise<Team | null> => {
    const loggedInUserString = localStorage.getItem('loggedInUser');

    if (!loggedInUserString) {
        throw new Error('Log in first, please');
    }

    const loggedInUser = JSON.parse(loggedInUserString);
    const token = loggedInUser.token;

    if (!token) {
        throw new Error('No authorization token found. Log in first, please');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
    const loggedInUserString = localStorage.getItem('loggedInUser');

    if (!loggedInUserString) {
        throw new Error('Log in first, please');
    }

    const loggedInUser = JSON.parse(loggedInUserString);
    const token = loggedInUser.token;

    if (!token) {
        throw new Error('No authorization token found. Log in first, please');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${team.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(team),
        });

        return response.ok;
    } catch (error) {
        console.error('Error updating team:', error);
        return false;
    }
};

const addPlayerToTeam = async (teamId: number, playerId: number): Promise<boolean> => {
    const loggedInUserString = localStorage.getItem('loggedInUser');

    if (!loggedInUserString) {
        throw new Error('Log in first, please');
    }

    const loggedInUser = JSON.parse(loggedInUserString);
    const token = loggedInUser.token;

    if (!token) {
        throw new Error('No authorization token found. Log in first, please');
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/addPlayer`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ playerId }),
            }
        );

        return response.ok;
    } catch (error) {
        console.error('Error adding player to team:', error);
        return false;
    }
};

const removePlayerFromTeam = async (teamId: number, playerId: number): Promise<boolean> => {
    const loggedInUserString = localStorage.getItem('loggedInUser');

    if (!loggedInUserString) {
        throw new Error('Log in first, please');
    }

    const loggedInUser = JSON.parse(loggedInUserString);
    const token = loggedInUser.token;

    if (!token) {
        throw new Error('No authorization token found. Log in first, please');
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/removePlayer`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ playerId }),
            }
        );

        return response.ok;
    } catch (error) {
        console.error('Error removing player from team:', error);
        return false;
    }
};

export default {
    getAllTeams,
    getTeamById,
    updateTeam,
    addPlayerToTeam,
    removePlayerFromTeam,
};
