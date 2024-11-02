import { Goal } from './goal';
import { Team } from './team';

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

    private coachOfTeam?: number;
    private captainOfTeam?: number;
    private playerOfTeam?: number;
    private goals: Goal[] = [];

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
        coachOfTeam?: number;
        captainOfTeam?: number;
        playerOfTeam?: number;
        goals?: Goal[];
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
        this.coachOfTeam = user.coachOfTeam;
        this.captainOfTeam = user.captainOfTeam;
        this.playerOfTeam = user.playerOfTeam;
        this.goals = user.goals || [];
    }

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
        coachOfTeam?: number;
        captainOfTeam?: number;
        playerOfTeam?: number;
        goals?: Goal[];
    }) {
        if (user.id <= 0) throw new Error('Id cannot be negative or zero.');
        if (!user.firstName) throw new Error('First name cannot be empty.');
        if (!user.lastName) throw new Error('Last name cannot be empty.');
        if (!user.password || user.password.length < 8)
            throw new Error('Password needs to be at least 8 characters long.');
        if (!user.birthDate || user.birthDate.getTime() >= new Date().getTime())
            throw new Error('Birth date must be in the past.');
        if (!user.email) throw new Error('Email cannot be empty.');

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(user.email)) throw new Error('Email does not have a correct format.');

        if (!user.username) throw new Error('Username cannot be empty.');
        if (!user.description) throw new Error('Description cannot be empty.');
        if (!user.role) throw new Error('Role cannot be empty.');
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

    getCoachOfTeam(): number | undefined {
        return this.coachOfTeam;
    }

    getCaptainOfTeam(): number | undefined {
        return this.captainOfTeam;
    }

    getPlayerOfTeam(): number | undefined {
        return this.playerOfTeam;
    }

    getGoals(): Goal[] {
        return this.goals;
    }

    // Setters with validation as needed
    setFirstName(firstName: string): void {
        if (!firstName) throw new Error("First name can't be empty.");
        this.firstName = firstName;
    }

    setLastName(lastName: string): void {
        if (!lastName) throw new Error("Last name can't be empty.");
        this.lastName = lastName;
    }

    setPassword(password: string): void {
        if (password.length < 8) throw new Error('Password must be at least 8 characters.');
        this.password = password;
    }

    setBirthDate(birthDate: Date): void {
        if (birthDate.getTime() >= new Date().getTime())
            throw new Error('Birth date must be in the past.');
        this.birthDate = birthDate;
    }

    setEmail(email: string): void {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) throw new Error('Invalid email format.');
        this.email = email;
    }

    setUsername(username: string): void {
        if (!username) throw new Error("Username can't be empty.");
        this.username = username;
    }

    setDescription(description: string): void {
        if (!description) throw new Error("Description can't be empty.");
        this.description = description;
    }

    setRole(role: string): void {
        if (!role) throw new Error("Role can't be empty.");
        this.role = role;
    }

    setCoachOfTeam(team: number): void {
        this.coachOfTeam = team;
    }

    setCaptainOfTeam(team: number): void {
        this.captainOfTeam = team;
    }

    setPlayerOfTeam(team: number): void {
        this.playerOfTeam = team;
    }

    setGoals(goals: Goal[]): void {
        this.goals = goals;
    }

    equals(user: User): boolean {
        return (
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.password === user.getPassword() &&
            this.birthDate.getTime() === user.getBirthDate().getTime() &&
            this.email === user.getEmail() &&
            this.username === user.getUsername() &&
            this.description === user.getDescription() &&
            this.role === user.getRole()
        );
    }
}
