import {
    Match as MatchPrisma,
    Goal as GoalPrisma,
    Location as LocationPrisma,
} from '@prisma/client';
import { Goal } from './goal';
import { Location } from './location';

export class Match {
    private id: number;
    private date: Date;
    private goals: Goal[];
    private location: Location;

    constructor(match: { id: number; date: Date; goals?: Goal[]; location: Location }) {
        this.validate(match);

        this.id = match.id;
        this.date = match.date;
        this.goals = match.goals || [];
        this.location = match.location;
    }

    // Needs to be properly implemented
    validate(match: { id: number; date: Date; location: Location }): void {
        if (!match.id) {
            throw new Error('Match id is required');
        }
        if (!match.date) {
            throw new Error('Match date is required');
        }
        if (!match.location) {
            throw new Error('Match location is required');
        }
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }

    getGoals(): Goal[] {
        return this.goals;
    }

    getLocation(): Location {
        return this.location;
    }

    // Setters
    setId(id: number): void {
        this.id = id;
    }

    setDate(date: Date): void {
        this.date = date;
    }

    setGoals(goals: Goal[]): void {
        this.goals = goals;
    }

    setLocation(location: Location): void {
        this.location = location;
    }

    // Prisma Match to Match
    static from({
        id,
        date,
        goals,
        location,
    }: MatchPrisma & { location: LocationPrisma; goals: GoalPrisma[] }) {
        return new Match({
            id,
            date,
            goals: goals.map((goal) => Goal.from(goal)),
            location: Location.from(location),
        });
    }

    equals(match: Match): boolean {
        return this.id === match.getId() && this.date === match.getDate();
    }
}
