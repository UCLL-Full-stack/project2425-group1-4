import { User } from '@types';

const getAllPlayers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/players', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
        method: "GET",
        headers: {
            'content-Type': 'application/json',
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

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const registerUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    getAllPlayers,
    getAllUsers,
    updateUser,
    getUserById,
    loginUser,
    registerUser
};

export default UserService;
