import { Match as MatchPrisma } from '@prisma/client';

export class Match {
    private id: number;
    private date: Date;
    // private goals: Goal[];
    // private location: Location;

    constructor(match: { id: number; date: Date }) {
        this.validate(match);

        this.id = match.id;
        this.date = match.date;
    }

    // Needs to be properly implemented
    validate(match: { id: number; date: Date }) {
        if (!match.id) {
            throw new Error('Match id is required');
        }
        if (!match.date) {
            throw new Error('Match date is required');
        }
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setDate(date: Date): void {
        this.date = date;
    }

    // Prisma Match to Match
    static from({ id, date }: Match): Match {
        return new Match({
            id,
            date,
        });
    }

    equals(match: Match): boolean {
        return this.id === match.getId() && this.date === match.getDate();
    }
}
