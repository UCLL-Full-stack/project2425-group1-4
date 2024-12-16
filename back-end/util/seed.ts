import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Clean up the database
    await prisma.goal.deleteMany();
    await prisma.location.deleteMany();
    await prisma.match.deleteMany();
    await prisma.team.deleteMany();
    await prisma.user.deleteMany();

    // Create users with different roles
    const [maxim, mathieu, lionel, admin, cristiano, sergio, coachPep, coachZidane] = await Promise.all([
        prisma.user.create({
            data: {
                firstName: 'Maxim',
                lastName: 'Delloye',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('2003-10-01'),
                email: 'r0898568@ucll.be',
                username: 'maximdel',
                description: 'hello world',
                role: 'ADMIN',
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Mathieu',
                lastName: 'Sibret',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('2001-06-09'),
                email: 'r0833900@ucll.be',
                username: 'msibret',
                description: 'hola',
                role: 'ADMIN',
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Admin',
                lastName: 'UCLL',
                password: await bcrypt.hash('secure12345', 10),
                birthDate: new Date('1995-01-01'),
                email: 'admin@ucll.be',
                username: 'admin',
                description: 'the one and only',
                role: 'ADMIN',
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Lionel',
                lastName: 'Messi',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('1987-06-24'),
                email: 'lionel.messi@example.com',
                username: 'lionelm',
                description: 'Best player in the world',
                role: 'PLAYER',
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Cristiano',
                lastName: 'Ronaldo',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('1985-02-05'),
                email: 'cristiano.ronaldo@example.com',
                username: 'cristianor',
                description: 'Top scorer',
                role: 'PLAYER',
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Sergio',
                lastName: 'Ramos',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('1986-03-30'),
                email: 'sergio.ramos@example.com',
                username: 'sergior',
                description: 'Defensive leader',
                role: 'PLAYER',
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Pep',
                lastName: 'Guardiola',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('1971-01-18'),
                email: 'pep.guardiola@example.com',
                username: 'pepg',
                description: 'Best coach in the world',
                role: 'COACH',
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Zinedine',
                lastName: 'Zidane',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('1972-06-23'),
                email: 'zinedine.zidane@example.com',
                username: 'zizou',
                description: 'Iconic coach and player',
                role: 'COACH',
            },
        }),
    ]);

    // Create locations
    const locations = await prisma.location.createMany({
        data: [
            { country: 'Belgium', city: 'Brussels', streetName: 'Rue de la Loi', zipCode: '1000', number: '16' },
            { country: 'France', city: 'Paris', streetName: 'Champs-Élysées', zipCode: '75008', number: '101' },
            { country: 'Netherlands', city: 'Amsterdam', streetName: 'Dam Square', zipCode: '1012', number: '5' },
        ],
    });

    // Create teams
    const [barcelona, madrid] = await Promise.all([
        prisma.team.create({
            data: {
                name: 'FC Barcelona',
                description: 'Best team in the world',
                coach: { connect: { id: coachPep.id } },
                players: { connect: [{ id: lionel.id }] },
            },
        }),
        prisma.team.create({
            data: {
                name: 'Real Madrid',
                description: 'Historic team with many titles',
                coach: { connect: { id: coachZidane.id } },
                players: { connect: [{ id: cristiano.id }, { id: sergio.id }] },
            },
        }),
    ]);

    // Create matches
    const matches = await prisma.match.createMany({
        data: [
            { date: new Date(), locationId: 1 },
            { date: new Date(), locationId: 2 },
        ],
    });

    console.log('Seeding completed');
};

main()
    .then(() => prisma.$disconnect())
    .catch((error) => {
        console.error(error);
        prisma.$disconnect();
        process.exit(1);
    });
