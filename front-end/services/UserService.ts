import { User } from '@types';
import getBaseWebpackConfig from 'next/dist/build/webpack-config';

const getAllPlayers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/players', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const updateUser = async (user: User) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};
const getUserById = async (userId: number): Promise<User | null> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const user: User = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null;
    }
};

const UserService = {
    getAllPlayers,
    updateUser,
    getUserById,
};

export default UserService;
