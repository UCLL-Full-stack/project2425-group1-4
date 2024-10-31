import {Team as TeamPrisa} from '@prisma/client';
import { User } from './user';

export class Team {

    private id : number;
    private name : string;
    private captain: User;
    private coach: User;
    private players: User[];
    private description: string;

    constructor(team: {id: number, name: string, captain: User, coach: User, players: User[], description: string}) {
        this.validate(team);

        this.id = team.id;
        this.name = team.name;
        this.captain = team.captain;
        this.coach = team.coach;
        this.players = team.players;
        this.description = team.description;
    }

    // Needs to be properly implemented
    validate(team:{id: number, name: string, captain: User, coach: User, players: User[], description: string}) {
        if (team.id < 0) {
            throw new Error('Id cannot be negative');
        }
        if (team.name === '') {
            throw new Error('Invalid name');
        }
        if (team.captain === null) {
            throw new Error('Invalid captain');
        }
        if (team.coach === null) {
            throw new Error('Invalid coach');
        }
        if (team.players === null) {
            throw new Error('Invalid players');
        }
        if (team.description === '') {
            throw new Error('Invalid description');
        }
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getCaptain(): User {
        return this.captain;
    }

    getCoach(): User {
        return this.coach;
    }

    getPlayers(): User[] {
        return this.players;
    }

    getDescription(): string {
        return this.description;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setCaptain(captain: User): void {
        this.captain = captain;
    }

    setCoach(coach: User): void {
        this.coach = coach;
    }

    setPlayers(players: User[]): void {
        this.players = players;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    // Prisma Team to Team
    static from({
        id,
        name,
        captain,
        coach,
        players,
        description,

    }: Team) {
        return new Team({
            id,
            name,
            captain,
            coach,
            players,
            description,
    });
    }

    equals(team: Team): boolean {
        return (
            this.id === team.getId() &&
            this.name === team.getName() &&
            this.captain === team.getCaptain() &&
            this.coach === team.getCoach() &&
            this.players === team.getPlayers() &&
            this.description === team.getDescription()
        )
    }
}
