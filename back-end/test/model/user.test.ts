import { User } from '../../model/user';

test('given: valid values for user, when: creating a new user, then: user is created with those values', () => {
    // given
    const id = 1;
    const firstName = 'John';
    const lastName = 'Doe';
    const password = 'password';
    const birthDate = new Date();
    const email = 'john.doe@example.com';
    const username = 'john_doe';
    const description = 'description';
    const role = 'PLAYER';

    // when
    const user = new User({
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

    // then
    expect(user.getId()).toBe(id);
    expect(user.getFirstName()).toBe(firstName);
    expect(user.getLastName()).toBe(lastName);
    expect(user.getPassword()).toBe(password);
    expect(user.getBirthDate()).toBe(birthDate);
    expect(user.getEmail()).toBe(email);
    expect(user.getUsername()).toBe(username);
    expect(user.getDescription()).toBe(description);
    expect(user.getRole()).toBe(role);
});
