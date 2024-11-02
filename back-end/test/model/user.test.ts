import { User } from '../../domain/model/user';

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

test('given: negative id, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: -1,
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
            birthDate: new Date(),
            email: 'john.doe@example.com',
            username: 'john_doe',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('Id cannot be negative.');
});

test('given: empty first name, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: '',
            lastName: 'Doe',
            password: 'password',
            birthDate: new Date(),
            email: 'john.doe@example.com',
            username: 'john_doe',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('First name cannot be empty.');
});

test('given: empty last name, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: '',
            password: 'password',
            birthDate: new Date(),
            email: 'john.doe@example.com',
            username: 'john_doe',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('Last name cannot be empty.');
});

test('given: empty password, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: '',
            birthDate: new Date(),
            email: 'john.doe@example.com',
            username: 'john_doe',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('Password cannot be empty.');
});

test('given: short password, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: 'short',
            birthDate: new Date(),
            email: 'john.doe@example.com',
            username: 'john_doe',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('Password needs to be at least 8 characters long.');
});

test('given: empty birth date, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
            birthDate: new Date(''),
            email: 'john.doe@example.com',
            username: 'john_doe',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('Birth date cannot be empty.');
});

test('given: empty email, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
            birthDate: new Date(),
            email: '',
            username: 'john_doe',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('Email cannot be empty.');
});

test('given: invalid email format, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
            birthDate: new Date(),
            email: 'john.doe@com',
            username: 'john_doe',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('Email does not have a correct format.');
});

test('given: empty username, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
            birthDate: new Date(),
            email: 'john.doe@example.com',
            username: '',
            description: 'description',
            role: 'PLAYER',
        });
    }).toThrow('Username cannot be empty.');
});

test('given: empty description, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
            birthDate: new Date(),
            email: 'john.doe@example.com',
            username: 'john_doe',
            description: '',
            role: 'PLAYER',
        });
    }).toThrow('Description cannot be empty.');
});

test('given: empty role, when: creating a new user, then: throws error', () => {
    expect(() => {
        new User({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            password: 'password',
            birthDate: new Date(),
            email: 'john.doe@example.com',
            username: 'john_doe',
            description: 'description',
            role: '',
        });
    }).toThrow('Role cannot be empty.');
});
