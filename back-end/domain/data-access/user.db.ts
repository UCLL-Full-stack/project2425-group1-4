import { User } from '../model/user';

let currentId = 1;

const users: User[] = [
    new User({
        id: currentId++,
        firstName: 'Maxim',
        lastName: 'Delloye',
        password: 'abcdefghij',
        birthDate: new Date('2003-10-01'),
        email: 'r0898568@ucll.be',
        username: 'maximdel',
        description: 'hello world',
        role: 'User',
    }),
];

const getAllPlayers = () => {
    const players = [];
    for (let player of users) {
        if (player.getRole() === 'Player') {
            players.push(player);
        }
    }
    return players;
};

export default { getAllPlayers };
