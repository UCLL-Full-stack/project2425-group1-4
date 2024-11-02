export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private password: string;
    private birthDate: Date;
    private email: string;
    private username: string;
    private description: string;
    private role: string;

    constructor(user: {
        id: number;
        firstName: string;
        lastName: string;
        password: string;
        birthDate: Date;
        email: string;
        username: string;
        description: string;
        role: string;
    }) {
        this.validate(user);

        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.password = user.password;
        this.birthDate = user.birthDate;
        this.email = user.email;
        this.username = user.username;
        this.description = user.description;
        this.role = user.role;
    }

    // Needs to be properly set up
    validate(user: {
        id: number;
        firstName: string;
        lastName: string;
        password: string;
        birthDate: Date;
        email: string;
        username: string;
        description: string;
        role: string;
    }) {
        if (user.id <= 0) {
            throw new Error('Id cannot be negative.');
        }
        if (user.firstName === '') {
            throw new Error('First name cannot be empty.');
        }
        if (user.lastName === '') {
            throw new Error('Last name cannot be empty.');
        }
        if (user.password === '') {
            throw new Error('Password cannot be empty.');
        }
        if (user.password.length < 8) {
            throw new Error('Password needs to be at least 8 characters long.');
        }
        if (user.birthDate === new Date()) {
            throw new Error('Birth date cannot be empty.');
        }
        if (user.email === '') {
            throw new Error('Email cannot be empty.');
        }

        const regexEmail = new RegExp('^[\\w\\-.]+@([\\w\\-]+\\.)+[\\w\\-]{2,4}$');
        if (!regexEmail.test(user.email)) {
            throw new Error('Email does not have a correct format.');
        }
        if (user.username === '') {
            throw new Error('Username cannot be empty.');
        }
        if (user.description === '') {
            throw new Error('Description cannot be empty.');
        }
        if (user.role === '') {
            throw new Error('Role cannot be empty.');
        }
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getPassword(): string {
        return this.password;
    }

    getBirthDate(): Date {
        return this.birthDate;
    }

    getEmail(): string {
        return this.email;
    }

    getUsername(): string {
        return this.username;
    }

    getDescription(): string {
        return this.description;
    }

    getRole(): string {
        return this.role;
    }

    // Setters
    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setBirthDate(birthDate: Date): void {
        this.birthDate = birthDate;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setRole(role: string): void {
        this.role = role;
    }

    equals(user: User): boolean {
        return (
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.password === user.getPassword() &&
            this.birthDate === user.getBirthDate() &&
            this.email === user.getEmail() &&
            this.username === user.getUsername() &&
            this.description === user.getDescription() &&
            this.role === user.getRole()
        );
    }
}
