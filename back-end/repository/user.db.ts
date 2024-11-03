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
        firstName: 'Mathieu',
        lastName: 'Sibret',
        password: '1234889aaa',
        birthDate: new Date('2001-06-09'),
        email: 'r0833900@ucll.be',
        username: 'msibret',
        description: 'hola',
        role: 'Player',
        playerOfTeam: 1,
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
        playerOfTeam: 1,
    }),
    new User({
        id: currentId++,
        firstName: 'John',
        lastName: 'Smith',
        password: 'password123',
        birthDate: new Date('1985-05-15'),
        email: 'johnsmith@example.com',
        username: 'jsmith',
        description: 'Look at my very interesting description!',
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
        description: 'This is my description :D',
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

const getUserById = (id: number): User | null => {
    const user = users.find((u) => u.getId() === id);
    return user || null;
};

const updateUser = (user: User): User => {
    const index = users.findIndex((u) => u.getId() === user.getId());
    if (index !== -1) {
        users[index] = user;
    }
    return users[index];
};

export default { getAllPlayers, getAllUsers, getUserById, updateUser };
