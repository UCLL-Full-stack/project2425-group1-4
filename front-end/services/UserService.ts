import getBaseWebpackConfig from 'next/dist/build/webpack-config';

export const getAllPlayers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/players', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const UserService = {
    getAllPlayers,
};

export default UserService;
