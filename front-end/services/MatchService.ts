import { User } from '@types';

const getAllMatches = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/matches', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const UserService = {
    getAllMatches,
};

export default UserService;
