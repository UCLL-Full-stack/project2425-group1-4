import { User } from '@types';

const getAllPlayers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/players', {
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

const getUserById = async (userId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const UserService = {
    getAllPlayers,
    updateUser,
    getUserById,
};

export default UserService;
