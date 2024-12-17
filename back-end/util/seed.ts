import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Clean up the database
    await prisma.goal.deleteMany();
    await prisma.location.deleteMany();
    await prisma.matchTeam.deleteMany();
    await prisma.match.deleteMany();
    await prisma.team.deleteMany();
    await prisma.user.deleteMany();

    // Create users with different roles
    const [
        maxim,
        mathieu,
        admin,
        lionel,
        cristiano,
        sergio,
        coachPep,
        coachZidane,
        neymar,
        mbappe,
    ] = await Promise.all([
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
                firstName: 'User',
                lastName: '1',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('1972-06-23'),
                email: 'user@example.com',
                username: 'user1',
                description: 'Iconic user',
                role: 'USER',
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
        prisma.user.create({
            data: {
                firstName: 'Neymar',
                lastName: 'Jr',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('1971-01-18'),
                email: 'neymar@ucll.be',
                username: 'neymar',
                description: 'Simulator simulator',
                role: 'PLAYER',
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Kylian',
                lastName: 'Mbappe',
                password: await bcrypt.hash('abcdefghij', 10),
                birthDate: new Date('1971-01-18'),
                email: 'mbappe@ucll.be',
                username: 'mbappe',
                description: 'Up and coming',
                role: 'PLAYER',
            },
        }),
    ]);

    // Create Locations
    const [campNou, bernabeu, parcDesPrinces, etihad] = await Promise.all([
        prisma.location.create({
            data: {
                country: 'Spain',
                city: 'Barcelona',
                streetName: "Carrer d'Arístides Maillol",
                zipCode: '08028',
                number: '12',
            },
        }),
        prisma.location.create({
            data: {
                country: 'Spain',
                city: 'Madrid',
                streetName: 'Avenida de Concha Espina',
                zipCode: '28036',
                number: '1',
            },
        }),
        prisma.location.create({
            data: {
                country: 'France',
                city: 'Paris',
                streetName: 'Rue du Commandant Guilbaud',
                zipCode: '75016',
                number: '24',
            },
        }),
        prisma.location.create({
            data: {
                country: 'England',
                city: 'Manchester',
                streetName: 'Ashton New Rd',
                zipCode: 'M11 3FF',
                number: '100',
            },
        }),
    ]);

    // Create teams
    const [barcelona, madrid, psg, mancity] = await Promise.all([
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
        prisma.team.create({
            data: {
                name: 'Paris Saint-Germain',
                description: 'Top French club',
                coach: { connect: { id: coachPep.id } },
                players: { connect: [{ id: neymar.id }, { id: mbappe.id }] },
            },
        }),
        prisma.team.create({
            data: {
                name: 'Manchester City',
                description: 'Top team in the Premier League',
                coach: { connect: { id: coachPep.id } },
                players: { connect: [{ id: lionel.id }, { id: cristiano.id }] },
            },
        }),
    ]);

    // Create Matches
    const [match1, match2, match3, match4, match5] = await Promise.all([
        prisma.match.create({
            data: {
                date: new Date(),
                location: { connect: { id: campNou.id } },
                teams: {
                    create: [
                        { team: { connect: { id: barcelona.id } } },
                        { team: { connect: { id: madrid.id } } },
                    ],
                },
            },
        }),
        prisma.match.create({
            data: {
                date: new Date(),
                location: { connect: { id: parcDesPrinces.id } },
                teams: {
                    create: [
                        { team: { connect: { id: psg.id } } },
                        { team: { connect: { id: mancity.id } } },
                    ],
                },
            },
        }),
        prisma.match.create({
            data: {
                date: new Date(),
                location: { connect: { id: bernabeu.id } },
                teams: {
                    create: [
                        { team: { connect: { id: madrid.id } } },
                        { team: { connect: { id: psg.id } } },
                    ],
                },
            },
        }),
        prisma.match.create({
            data: {
                date: new Date(),
                location: { connect: { id: 1 } },
                teams: {
                    create: [
                        { team: { connect: { id: barcelona.id } } },
                        { team: { connect: { id: madrid.id } } },
                    ],
                },
            },
            include: { teams: true },
        }),
        prisma.match.create({
            data: {
                date: new Date(),
                location: { connect: { id: 2 } },
                teams: {
                    create: [
                        { team: { connect: { id: madrid.id } } },
                        { team: { connect: { id: barcelona.id } } },
                    ],
                },
            },
            include: { teams: true },
        })
    ]);


    // Create Goals
    await prisma.goal.createMany({
        data: [
            { time: 15, matchId: match1.id, teamId: barcelona.id, playerId: lionel.id },
            { time: 45, matchId: match1.id, teamId: madrid.id, playerId: cristiano.id },
            { time: 30, matchId: match2.id, teamId: psg.id, playerId: mbappe.id },
            { time: 60, matchId: match2.id, teamId: mancity.id, playerId: lionel.id },
            { time: 25, matchId: match3.id, teamId: madrid.id, playerId: sergio.id },
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
