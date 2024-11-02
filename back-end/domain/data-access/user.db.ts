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
        role: 'Player',
    }),
    new User({
        id: currentId++,
        firstName: 'Jane',
        lastName: 'Doe',
        password: '123456lisqbj',
        birthDate: new Date('1990-07-21'),
        email: 'janedoe@example.com',
        username: 'jdoe',
        description: 'Jane Doe',
        role: 'User',
    }),
    new User({
        id: currentId++,
        firstName: 'John',
        lastName: 'Smith',
        password: 'password123',
        birthDate: new Date('1985-05-15'),
        email: 'johnsmith@example.com',
        username: 'jsmith',
        description: 'John Smith',
        role: 'Player',
    }),
    new User({
        id: currentId++,
        firstName: 'Alice',
        lastName: 'Johnson',
        password: 'alicepassword',
        birthDate: new Date('1992-11-30'),
        email: 'alicejohnson@example.com',
        username: 'alicej',
        description: 'Alice Johnson',
        role: 'Player',
    }),
];

// Get all users with role 'Player'
const getAllPlayers = (): User[] => {
    return users.filter((user) => user.getRole() === 'Player');
};

const getAllUsers = (): User[] => {
    return users;
};

export default { getAllPlayers, getAllUsers };
