import { Team } from '../../domain/model/team';
import { User } from '../../domain/model/user';

const validUser = new User({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    birthDate: new Date('2000-01-01'),
    email: 'coach@football.be',
    username: 'john_doe',
    description: 'description',
    role: 'role',
});

const validId = 1;
const validName = 'team1';
const validCaptain = validUser;
const validCoach = validUser;
const validPlayers = [validUser];
const validDescription = 'description';

const emptyName = '';
const negativeId = -1;
const nullCaptain = null;
const nullCoach = null;
const nullPlayers = null;
const emptyDescription = '';

test(`given: valid parameters, when: create a team, then: team should be created`, () => {
    // When
    const team = new Team({
        id: validId,
        name: validName,
        captain: validCaptain,
        coach: validCoach,
        players: validPlayers,
        description: validDescription,
    });

    // Then
    expect(team).toBeDefined();
    expect(team.getId()).toBe(1);
    expect(team.getName()).toBe('team1');
    expect(team.getCaptain()).toBe(validUser);
    expect(team.getCoach()).toBe(validUser);
    expect(team.getPlayers()).toBe(validPlayers);
    expect(team.getDescription()).toBe('description');
});

test(`given: negative id, when: create team, then: error is thrown`, () => {
    expect(
        () =>
            new Team({
                id: negativeId,
                name: validName,
                captain: validCaptain,
                coach: validCoach,
                players: validPlayers,
                description: validDescription,
            })
    ).toThrow('Id cannot be negative');
});

test(`given: empty name, when: create team, then: error is thrown`, () => {
    expect(
        () =>
            new Team({
                id: validId,
                name: emptyName,
                captain: validCaptain,
                coach: validCoach,
                players: validPlayers,
                description: validDescription,
            })
    ).toThrow('Invalid name');
});

// test(`given: no captain, when: create team, then: error is thrown`, () => {
//     expect(
//         () =>
//             new Team({
//                 id: validId,
//                 name: validName,
//                 captain: nullCaptain,
//                 coach: validCoach,
//                 players: validPlayers,
//                 description: validDescription,
//             })
//     ).toThrow('Invalid name');
// });

test(`given: empty description, when: create team, then: error is thrown`, () => {
    expect(
        () =>
            new Team({
                id: validId,
                name: validName,
                captain: validCaptain,
                coach: validCoach,
                players: validPlayers,
                description: emptyDescription,
            })
    ).toThrow('Invalid description');
});
