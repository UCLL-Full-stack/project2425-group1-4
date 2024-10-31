import { error } from "console";
import { User } from "../../model/user";
import { Team } from "../../model/team";




test(`given: valid parameters, when: create a team, then: team should be created`, () => {
    // Given
    const user = new User({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
        birthDate: new Date(),
        email: '',
        username: 'john_doe',
        description: 'description',
        role: 'role',
    });

    const id = 1;
    const name = 'team1'
    const captain = user;
    const coach = user;
    const players = [user];
    const description = 'description';

    // When
    const team = new Team({
        id,
        name,
        captain,
        coach,
        players,
        description,
});

    // Then
    expect(team).toBeDefined();
    expect(team.getId()).toBe(id);
    expect(team.getName()).toBe(name);
    expect(team.getCaptain()).toBe(captain);
    expect(team.getCoach()).toBe(coach);
    expect(team.getPlayers()).toBe(players);
    expect(team.getDescription()).toBe(description);
});

