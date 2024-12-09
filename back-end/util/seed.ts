import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.goal.deleteMany();
    await prisma.location.deleteMany();
    await prisma.match.deleteMany();
    await prisma.team.deleteMany();
    await prisma.user.deleteMany();

    const maxim = await prisma.user.create({
        data: {
            firstName: 'Maxim',
            lastName: 'Delloye',
            password: 'abcdefghij',
            birthDate: new Date('2003-10-01'),
            email: 'r0898568@ucll.be',
            username: 'maximdel',
            description: 'hello world',
            role: 'USER',
        },
    });

    const mathieu = await prisma.user.create({
        data: {
            firstName: 'Mathieu',
            lastName: 'Sibret',
            password: '1234889aaa',
            birthDate: new Date('2001-06-09'),
            email: 'r0833900@ucll.be',
            username: 'msibret',
            description: 'hola',
            role: 'USER',
        },
    });

    const jane = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Doe',
            password: '123456lisqbj',
            birthDate: new Date('1990-07-21'),
            email: 'janedoe@example.com',
            username: 'jdoe',
            description: 'Jane Doe',
            role: 'USER',
        },
    });

    const john = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Smith',
            password: 'password123',
            birthDate: new Date('1985-05-15'),
            email: 'johnsmith@example.com',
            username: 'jsmith',
            description: 'Look at my very interesting description!',
            role: 'USER',
        },
    });

    const alice = await prisma.user.create({
        data: {
            firstName: 'Alice',
            lastName: 'Johnson',
            password: 'alicepassword',
            birthDate: new Date('1992-11-30'),
            email: 'alicejohnson@example.com',
            username: 'alicej',
            description: 'This is my description :D',
            role: 'USER',
        },
    });

    const bob = await prisma.user.create({
        data: {
            firstName: 'Bob',
            lastName: 'Marley',
            password: 'bobypassword',
            birthDate: new Date('1952-10-11'),
            email: 'bobmarly@example.com',
            username: 'bobm',
            description: 'Heeelooooo',
            role: 'PLAYER',
        },
    });

    const lionel = await prisma.user.create({
        data: {
            firstName: 'Lionel',
            lastName: 'Messi',
            password: 'password123',
            birthDate: new Date('1987-06-24'),
            email: 'lionel.messi@example.com',
            username: 'lionelm',
            description: 'Best player in the world',
            role: 'PLAYER',
        },
    });

    const andres = await prisma.user.create({
        data: {
            firstName: 'Andres',
            lastName: 'Iniesta',
            password: 'password123',
            birthDate: new Date('1984-05-11'),
            email: 'azdazd@outlook.com',
            username: 'andresi',
            description: 'Best midfielder in the world',
            role: 'PLAYER',
        },
    });

    const barcolona = await prisma.team.create({
        data: {
            name: 'FC Barcelona',
            coach: {
                create: {
                    firstName: 'Pep',
                    lastName: 'Guardiola',
                    password: 'pepguardiola',
                    birthDate: new Date('1971-01-18'),
                    email: 'pep.guardiola@example.com',
                    username: 'pepg',
                    description: 'Best coach in the world',
                    role: 'COACH',
                },
            },
            players: {
                connect: [{ id: bob.id }, { id: lionel.id }, { id: andres.id }],
            },
            description: 'Best team in the world',
        },
    });

    const matheo = await prisma.user.create({
        data: {
            firstName: 'Matheo',
            lastName: 'Laurent',
            password: 'matheopassword',
            birthDate: new Date('1995-08-22'),
            email: 'matheo.laurent@example.com',
            username: 'matheol',
            description: 'Passionate player with high energy',
            role: 'PLAYER',
        },
    });

    const christiano = await prisma.user.create({
        data: {
            firstName: 'Cristiano',
            lastName: 'Ronaldo',
            password: 'cr7password',
            birthDate: new Date('1985-02-05'),
            email: 'cristiano.ronaldo@example.com',
            username: 'cristianor',
            description: 'Top scorer',
            role: 'PLAYER',
        },
    });

    const sergio = await prisma.user.create({
        data: {
            firstName: 'Sergio',
            lastName: 'Ramos',
            password: 'ramospassword',
            birthDate: new Date('1986-03-30'),
            email: 'sergio.ramos@example.com',
            username: 'sergior',
            description: 'Defensive leader',
            role: 'PLAYER',
        },
    });

    const madrid = await prisma.team.create({
        data: {
            name: 'Real Madrid',
            coach: {
                create: {
                    firstName: 'Zinedine',
                    lastName: 'Zidane',
                    password: 'zidane123',
                    birthDate: new Date('1972-06-23'),
                    email: 'zinedine.zidane@example.com',
                    username: 'zizou',
                    description: 'Iconic coach and player',
                    role: 'COACH',
                },
            },
            players: {
                connect: [{ id: matheo.id }, { id: christiano.id }, { id: sergio.id }],
            },
            description: 'Historic team with many titles',
        },
    });
    const locations = [
        {
            country: 'Belgium',
            city: 'Brussels',
            streetName: 'Rue de la Loi',
            zipCode: 1000,
            number: 16,
        },
        {
            country: 'France',
            city: 'Paris',
            streetName: 'Champs-Élysées',
            zipCode: 75008,
            number: 101,
        },
        {
            country: 'Netherlands',
            city: 'Amsterdam',
            streetName: 'Dam Square',
            zipCode: 1012,
            number: 5,
        },
    ];

    // teams data
    const teams = [
        {
            name: 'FC Brussels',
            description: 'A strong team from Brussels',
            coach: {
                connectOrCreate: {
                    where: { email: 'coach1@fcbrussels.com' },
                    create: {
                        firstName: 'Jane',
                        lastName: 'Doe',
                        email: 'coach1@fcbrussels.com',
                        role: 'Coach',
                        password: 'securepassword',
                    },
                },
            },
            players: {
                connectOrCreate: [
                    {
                        where: { email: 'player1@fcbrussels.com' },
                        create: {
                            firstName: 'Alice',
                            lastName: 'Smith',
                            email: 'player1@fcbrussels.com',
                            role: 'Player',
                            password: 'securepassword',
                        },
                    },
                    {
                        where: { email: 'player2@fcbrussels.com' },
                        create: {
                            firstName: 'Bob',
                            lastName: 'Johnson',
                            email: 'player2@fcbrussels.com',
                            role: 'Player',
                            password: 'securepassword',
                        },
                    },
                ],
            },
            location: {
                connect: { id: 1 }, // Connect this team to the first location (FC Brussels in Brussels)
            },
        },
        {
            name: 'Paris United',
            description: 'Top team from Paris',
            coach: {
                connectOrCreate: {
                    where: { email: 'coach1@parisunited.com' },
                    create: {
                        firstName: 'Clara',
                        lastName: 'Dupont',
                        email: 'coach1@parisunited.com',
                        role: 'Coach',
                        password: 'securepassword',
                    },
                },
            },
            players: {
                connectOrCreate: [
                    {
                        where: { email: 'player1@parisunited.com' },
                        create: {
                            firstName: 'Emily',
                            lastName: 'Durand',
                            email: 'player1@parisunited.com',
                            role: 'Player',
                            password: 'securepassword',
                        },
                    },
                    {
                        where: { email: 'player2@parisunited.com' },
                        create: {
                            firstName: 'Victor',
                            lastName: 'Rousseau',
                            email: 'player2@parisunited.com',
                            role: 'Player',
                            password: 'securepassword',
                        },
                    },
                ],
            },
            location: {
                connect: { id: 2 }, // Connect this team to the second location (Paris United in Paris)
            },
        },
    ];
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
