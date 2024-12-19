import { Goal } from '../../model/goal';
import { Team } from '../../model/team';
import { User } from '../../model/user';

const validTime = 5;
const validId = 1;

const emptyId: number | undefined = undefined;
const emptyTime: number | undefined = undefined;

const tooLowTime = -1;
const tooHighTime = 91;

const negativeId = -1;

const id = 1;
const firstName = 'John';
const lastName = 'Doe';
const password = 'password';
const birthDate = new Date('2000-01-01');
const email = 'john.doe@example.com';
const username = 'john_doe';
const description = 'description';
const role = 'PLAYER';

const validUser = new User({
    id: id,
    firstName: firstName,
    lastName: lastName,
    password: password,
    birthDate: birthDate,
    email: email,
    username: username,
    description: description,
    role: role,
});

const validName = 'team1';
const validCoach = validUser;
const validPlayers = [validUser];
const validDescription = 'description';

const emptyName = '';
const nullCoach = null;
const nullPlayers = null;
const emptyDescription = '';

const validTeam = new Team({
    id: validId,
    name: validName,
    coach: validCoach,
    players: validPlayers,
    description: validDescription,
});

test(`given: valid parameters, when: create a goal, then: goal is created`, () => {
    // given
    const goal = new Goal({
        id: validId,
        time: validTime,
        team: validTeam,
        player: validUser,
    });

    // then
    expect(goal).toBeDefined();
    expect(goal.getId()).toBe(1);
    expect(goal.getTime()).toBe(5);
});

test(`given: time under zero, when: create goal, then: error is thrown`, () => {
    expect(() => new Goal({ id: validId, time: tooLowTime, team: validTeam, player: validUser })).toThrow(
        'Goal time must be greater than 0'
    );
});

test(`given: time over 90, when: create goal, then: error is thrown`, () => {
    expect(() => new Goal({ id: validId, time: tooHighTime, team: validTeam, player: validUser})).toThrow(
        'Goal time must be under 90'
    );
});

test('given: no time, when: creating a new goal, then: error is thrown'), () => {
    consts goal = () => {
        new Goal({
            id: validId, team: validTeam, player: validUser
        })
    }
    expect(goal).toThrowError('Goal time is required')
};