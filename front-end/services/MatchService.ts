import { Match, User } from '@types';

const getAllMatches = async () => {
    const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/matches', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const createMatch = async (matchData: Match, token: string): Promise<Match> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(matchData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create match');
    }

    return await response.json();
};

const updateMatch = async (id: string, matchData: Partial<Match>, token: string): Promise<Match> => {
    if (!token) {
        throw new Error('Authorization token is missing');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(matchData),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || 'Failed to update match');
    }

    return await response.json();
};

const UserService = {
    getAllMatches,
    updateMatch,
    createMatch
};

export default UserService;
